using Microsoft.AspNetCore.Mvc;
using NoteCode.Services;

namespace NoteCode.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn(string email, string password)
        {
            var result =  await _authService.Login(email, password);
            if(!result) return Unauthorized("Invalid credentials");
            return Ok("Login successful");
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] UserSignUpModel model)
        {
            if(ModelState.IsValid)
            {
                var result = await _authService.SignUp(model);
                if(!result) return BadRequest("Email already in use");
                return Ok("User registered successfully");
            }

            return Ok("User registered successfully");
        }
    }
}