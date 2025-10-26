using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace InventoryApi.DTOs{
    public class ItemDto
    {
        
        [Required(ErrorMessage = "Name is required")]
        public string Name  { get; set; }
        
        public string? Description  { get; set; } 
        
        public string? Color  { get; set; } 
        
        public string? Type  { get; set; } 
        
        [Required(ErrorMessage = "Supplier must be selected")]
        [Range(1, int.MaxValue, ErrorMessage = "Supplier must be selected")]
        public int SupplierId  { get; set; } 
        
        [Required(ErrorMessage = "Supplier must be selected")]
        [Range(1, int.MaxValue, ErrorMessage = "Manufacturer must be selected")]
        public int ManufacturerId  { get; set; } 
    }
}