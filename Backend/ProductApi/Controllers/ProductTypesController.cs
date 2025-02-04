using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductApi.Data;
using ProductApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ProductTypesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductTypesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetProductTypes()
    {
        var productTypes = await _context.ProductTypes
            .Select(pt => new
            {
                Id = pt.Id,
                Name = pt.Name
            })
            .ToListAsync();

        return Ok(productTypes);
    }
}
