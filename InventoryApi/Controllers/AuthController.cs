using Microsoft.AspNetCore.Mvc;
using InventoryApi.Data;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace InventoryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.UserName == request.Username);

            if (user == null)
                return Unauthorized("User not found");

            bool isValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if (!isValid)
                return Unauthorized("Invalid password");

            //Result
            return Ok(new
            {
                message = "Login success",
                user = new {
                    user.Id,
                    user.UserName,
                    user.FullName,
                    Role = user.Role?.RoleName
                }
            });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
