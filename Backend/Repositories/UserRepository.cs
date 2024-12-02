using Microsoft.EntityFrameworkCore;
using NoteCode.Models;
using NoteCode.Data;
using NoteCode.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace NoteCode.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetByEmail(string email);
        Task Add(User user, bool isAdmin = false);

        Task<User[]> GetAllUsers();
    }
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User[]> GetAllUsers()
        {
            return await _context.Users.ToArrayAsync();
        }

        public async Task<User> GetByEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            
            return user;
        }

        public async Task Add(User user, bool isAdmin)
        {
            user.IsAdmin = isAdmin;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
    }
}