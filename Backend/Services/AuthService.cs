using Microsoft.IdentityModel.Tokens;
using NoteCode.Models;
using NoteCode.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace NoteCode.Services
{
    public interface IAuthService
    {
        Task<string> Login(UserSignInModel model);
        Task<bool> SignUp(UserSignUpModel model);
    }

    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;

        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<string> Login(UserSignInModel model)
        {
            var user = await _userRepository.GetByEmail(model.Email);
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }
            var passwordHash = HashPassword(model.Password);
            if (passwordHash != user.PasswordHash)
            {
                throw new UnauthorizedAccessException("Invalid password");
            }
            var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim("IsAdmin", user.IsAdmin.ToString())
        };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_secret_key"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "your_issuer",
                audience: "your_audience",
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public async Task<bool> SignUp(UserSignUpModel model)
        {
            if (await _userRepository.GetByEmail(model.Email) != null)
                return false;

            var passwordHash = HashPassword(model.Password);

            var user = new User
            {
                Username = model.Username,
                Email = model.Email,
                PasswordHash = passwordHash
            };
            await _userRepository.Add(user);

            return true;
        }
        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}