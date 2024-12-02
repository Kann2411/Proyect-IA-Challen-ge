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
        Task Add(User user, string role);

        Task<User[]> GetAllUsers();
    }
    public class UserRepository(AppDbContext context) : IUserRepository
    {
        public async Task<User[]> GetAllUsers()
        {
            return await context.Users.ToArrayAsync();
        }

        public async Task<User> GetByEmail(string email)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);
            return user ?? throw new NotFoundException($"User with email {email} not found");
        }

        public async Task Add(User user, string role)
        {
            user.Role = role;
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
        }
    }
}