using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductApi.Data;
using ProductApi.Models;

namespace ProductApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _context.Products
               .Include(p => p.ProductType)
               .Include(p => p.ProductColours)
                   .ThenInclude(pc => pc.Colour)
               .Select(p => new ProductDto
               {
                   Id = p.Id,
                   Name = p.Name,
                   ProductType = p.ProductType.Name,
                   Colours = p.ProductColours.Select(pc => pc.Colour.Name).ToList() ?? new List<string>()
               })
               .ToListAsync();

            return Ok(products);
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _context.Products
               .Include(p => p.ProductType)
               .Include(p => p.ProductColours)
                   .ThenInclude(pc => pc.Colour)
               .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound();

            var productDto = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                ProductType = product.ProductType.Name,
                Colours = product.ProductColours.Select(pc => pc.Colour.Name).ToList()
            };

            return Ok(productDto);
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, [FromBody] ProductRequest request)
        {
            var product = await _context.Products
                .Include(p => p.ProductColours)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound();

            product.Name = request.Name;
            product.ProductTypeId = request.ProductTypeId;

            // Update Colours: Remove old ones and add new ones
            product.ProductColours.Clear();
            product.ProductColours = request.ColourIds.Select(colourId => new ProductColour
            {
                ProductId = id,
                ColourId = colourId
            }).ToList();

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductDto>> PostProduct([FromBody] ProductRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name) || request.ProductTypeId <= 0 || request.ColourIds == null || !request.ColourIds.Any())
                return BadRequest("Invalid product data.");

            var product = new Product
            {
                Name = request.Name,
                ProductTypeId = request.ProductTypeId,
                ProductColours = request.ColourIds.Select(colourId => new ProductColour
                {
                    ColourId = colourId
                }).ToList()
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            var productDto = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                ProductType = (await _context.ProductTypes.FindAsync(product.ProductTypeId))?.Name,
                Colours = await _context.Colours
                    .Where(c => request.ColourIds.Contains(c.Id))
                    .Select(c => c.Name)
                    .ToListAsync()
            };

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, productDto);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }

    public class ProductRequest
    {
        public string Name { get; set; }
        public int ProductTypeId { get; set; }
        public List<int> ColourIds { get; set; }
    }
    
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ProductType { get; set; }
        public List<string> Colours { get; set; }
    }
}
