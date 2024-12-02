using NoteCode.Models;
using NoteCode.Repositories;
using System.Security.Cryptography;
using System.Text;

namespace NoteCode.Services
{
    public interface IAuthService
    {
        Task<bool> Login(string email, string password);
        Task<bool> SignUp(UserSignUpModel model);
    }

    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;

        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<bool> Login(string email, string password)
        {
            var user =  await _userRepository.GetByEmail(email);
            if (user == null) return false;

            var passwordHash = HashPassword(password);
            return user.PasswordHash == passwordHash;
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