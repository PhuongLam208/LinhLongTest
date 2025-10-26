using Microsoft.AspNetCore.Mvc;
using InventoryApi.Data;
using InventoryApi.DTOs;
using InventoryApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace InventoryApi.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ItemController(AppDbContext context){
            _context = context;
        }

        //View All
        [HttpGet("view-all")]
        public async Task<IActionResult> GetAllItems()
        {
            var items = await _context.Items
                .Include(i => i.Supplier)
                .Include(i => i.Manufacturer)
                .ToListAsync();

            return Ok(items.Select(i => new {
                id = i.Id,
                name = i.Name,
                description = i.Description,
                color = i.Color,
                type = i.Type,
                supplierId = i.SupplierId,
                manufacturerId = i.ManufacturerId,
                supplier = i.Supplier != null ? i.Supplier.Name : null,
                manufacturer = i.Manufacturer != null ? i.Manufacturer.Name : null
            }));

        }

        // CREATE
        [HttpPost("create")]
        public async Task<IActionResult> CreateItem([FromBody]ItemDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var newItem = new Item
            {
                Name = dto.Name,
                Description = dto.Description,
                Color = dto.Color,
                Type = dto.Type,
                SupplierId = dto.SupplierId,
                ManufacturerId = dto.ManufacturerId
            };

            _context.Items.Add(newItem);

            await _context.SaveChangesAsync();

            return Ok("Create New Item Successfully");
        }

        // UPDATE
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateItem(int id, [FromBody] ItemDto dto)
        {
             if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = await _context.Items.FindAsync(id);
            if (item == null) return NotFound("Cannot find any item with that Id");

            item.Name = dto.Name;
            item.Description = dto.Description;
            item.Color = dto.Color;
            item.Type = dto.Type;
            item.SupplierId = dto.SupplierId;
            item.ManufacturerId = dto.ManufacturerId;

            await _context.SaveChangesAsync();
            return Ok("Update Successfully");
        }

        // DELETE
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null) return NotFound("Cannot find any item with that Id");

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return Ok("Item is deleted");
        }
    }
}