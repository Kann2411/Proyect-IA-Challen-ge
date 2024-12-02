using Microsoft.IdentityModel.Tokens;
using NoteCode.Models;
using NoteCode.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Newtonsoft.Json;

namespace NoteCode.Services
{
    public interface IAuthService
    {
        string HashPassword(string password);
        Task<string> Login(UserSignInModel model);
        Task<bool> SignUp(UserSignUpModel model);
    }

    public class AuthService(IUserRepository userRepository) : IAuthService
    {
        public async Task<string> Login(UserSignInModel model)
        {
            var user = await userRepository.GetByEmail(model.Email) ?? throw new NotFoundException("User not found");
            var passwordHash = HashPassword(model.Password);

            var data = JsonConvert.DeserializeObject<dynamic>(model.ToString());

            //aqui hay que seguir!!!
            return "Admin";
            
        }
        public async Task<bool> SignUp(UserSignUpModel model)
        {
            if (await userRepository.GetByEmail(model.Email) != null)
                return false;

            var passwordHash = HashPassword(model.Password);

            var user = new User
            {
                Username = model.Username,
                Email = model.Email,
                PasswordHash = passwordHash
            };
            var role = "user";
            await userRepository.Add(user, role);

            return true;
        }

        public string HashPassword(string password)
        {
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = SHA256.HashData(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}