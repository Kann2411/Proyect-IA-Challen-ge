using Microsoft.AspNetCore.Mvc;
using NoteCode.Models;
using NoteCode.Services;

namespace NoteCode.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] UserSignInModel model)
        {
            try
            {
                var token = await authService.Login(model);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] UserSignUpModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await authService.SignUp(model);
                if (!result) return BadRequest("Email already in use");
                return Ok("User registered successfully");
            }

            return Ok("User registered successfully");
        }
    }
}