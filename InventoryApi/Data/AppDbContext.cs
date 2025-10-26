using Microsoft.EntityFrameworkCore;
using InventoryApi.Models;

namespace InventoryApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { 
        }

        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Table Role
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, RoleName = "Viewer"},
                new Role { Id = 2, RoleName = "Editor"}
            );

            // Table User
            modelBuilder.Entity<User>().HasData(
                new User {
                    Id = 1,
                    UserName = "staff1",
                    FullName = "Staff 1",
                    PasswordHash = "$2a$12$VMQi9hShzRw3TSxchXXT4ejWyk0T7FAtA1.rRwmib6qm6CUvL6TMm",
                    RoleId = 1
                },
                new User {
                    Id = 2,
                    UserName = "manager1",
                    FullName = "Manager 1",
                    PasswordHash = "$2a$12$VMQi9hShzRw3TSxchXXT4ejWyk0T7FAtA1.rRwmib6qm6CUvL6TMm",
                    RoleId = 2
                },
                new User {
                    Id = 3,
                    UserName = "admin",
                    FullName = "Admin",
                    PasswordHash = "$2a$12$VMQi9hShzRw3TSxchXXT4ejWyk0T7FAtA1.rRwmib6qm6CUvL6TMm",
                    RoleId = 2
                }

            );

            // Table Manufacturer
            modelBuilder.Entity<Manufacturer>().HasData(
                new Manufacturer { Id = 1, Name = "Sony" },
                new Manufacturer { Id = 2, Name = "Samsung" },
                new Manufacturer { Id = 3, Name = "Panasonic" },
                new Manufacturer { Id = 4, Name = "LG" },
                new Manufacturer { Id = 5, Name = "Nintendo" }
            );

            // Table Supplier
            modelBuilder.Entity<Supplier>().HasData(
                new Supplier { Id = 1, Name = "Nguyễn Văn An", Email = "annv@example.com" },
                new Supplier { Id = 2, Name = "Trần Minh Bảo", Email = "baotran@example.com" },
                new Supplier { Id = 3, Name = "Lê Thị Bình"},
                new Supplier { Id = 4, Name = "Trần Cường"},
                new Supplier { Id = 5, Name = "Lý Minh Tuệ", Contact = "0958237551" }
            );

            // Table Item
            modelBuilder.Entity<Item>().HasData(
                new Item
                {
                    Id = 1,
                    Name = "TV 50 inch",
                    Description = "Smart TV 4K",
                    Color = "Black",
                    Type = "Electronics",
                    SupplierId = 1,
                    ManufacturerId = 2
                },
                new Item
                {
                    Id = 2,
                    Name = "PlayStation 5",
                    Description = "Game Console",
                    Color = "White",
                    Type = "Electronics",
                    SupplierId = 2,
                    ManufacturerId = 1
                },
                new Item
                {
                    Id = 3,
                    Name = "Nintendo Switch Lite",
                    Description = "Game Console",
                    Color = "Pink",
                    Type = "Electronics",
                    SupplierId = 3,
                    ManufacturerId = 5
                }
            );
        }
    }
}
