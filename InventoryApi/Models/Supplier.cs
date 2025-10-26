using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace InventoryApi.Models{
    public class Supplier
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? Contact { get; set; }

        public string? Email { get; set; }

        public ICollection<Item>? Items { get; set; }
    }
}