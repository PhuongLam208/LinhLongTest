using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryApi.DTOs{
    public class LoginRequest
    {
        public string? Username  { get; set; }
        public string? Password  { get; set; } 
    }
}