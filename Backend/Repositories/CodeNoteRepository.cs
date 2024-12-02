using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using NoteCode.Data;
using NoteCode.Models;

namespace NoteCode.Repositories
{
    public interface IcodeNoteRepository
    {
        IEnumerable<CodeNote> GetPublicNotes();
        IEnumerable<CodeNote> GetUserNotes(int userId);
        CodeNote GetById(int id);
        void Add(CodeNote note);
    }

    public class CodeNoteRepository : IcodeNoteRepository
    {
        private readonly AppDbContext _context;

        public CodeNoteRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<CodeNote> GetPublicNotes()
        {
            return _context.CodeNotes.Where(n => n.IsPublic).ToList();
        }
          public IEnumerable<CodeNote> GetUserNotes(int userId)
        {
            return _context.CodeNotes.Where(n => n.UserId == userId).ToList();
        }

        public CodeNote GetById(int id)
        {
            var note = _context.CodeNotes.SingleOrDefault(n => n.Id == id);
            if(note == null) {
                throw new NotFoundException($"Nota con id {id} no encontrada");
            }
            return note;
        }

        public async void Add(CodeNote note)
        {
            _context.CodeNotes.Add(note);
            await _context.SaveChangesAsync();
        }
    }
}