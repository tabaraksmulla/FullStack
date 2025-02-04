using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductApi.Data;
using ProductApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ColoursController : ControllerBase
{
    private readonly AppDbContext _context;

    public ColoursController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetColours()
    {
        var colours = await _context.Colours
            .Select(c => new
            {
                Id = c.Id,
                Name = c.Name
            })
            .ToListAsync();

        return Ok(colours);
    }
}
