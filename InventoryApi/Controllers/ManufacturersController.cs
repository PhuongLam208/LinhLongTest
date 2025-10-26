using Microsoft.AspNetCore.Mvc;
using InventoryApi.Data;
using InventoryApi.DTOs;
using InventoryApi.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryApi.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class ManufacturerController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ManufacturerController(AppDbContext context){
            _context = context;
        }

        //View All
        [HttpGet("view-all")]
        public async Task<IActionResult> GetAllSuppliers()
        {
            var manufacturers = await _context.Manufacturers
                .ToListAsync();

            return Ok(manufacturers);

        }
    }
}