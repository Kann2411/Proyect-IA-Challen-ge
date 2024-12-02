using Microsoft.AspNetCore.Mvc;
using NoteCode.Models;
using NoteCode.Repositories;

namespace NoteCode.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NoteController : ControllerBase
    {
        private readonly IcodeNoteRepository _repository;

        public NoteController(IcodeNoteRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("public")]
        public IActionResult GetPublicNotes()
        {
            var notes = _repository.GetPublicNotes();
            return Ok(notes);
        }

        [HttpGet("{userId}")]
        public IActionResult GetUserNotes(int userId)
        {
            var notes = _repository.GetUserNotes(userId);
            return Ok(notes);
        }

        [HttpPost]
        public IActionResult CreateNote([FromBody] CodeNote note)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _repository.Add(note);
            return Ok(note);
        }
    }
}