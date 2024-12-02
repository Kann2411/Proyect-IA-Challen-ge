using Microsoft.AspNetCore.Http;
using NoteCode.Models;
using System.Threading.Tasks;

public class RoleMiddleware
{
    private readonly RequestDelegate _next;

    public RoleMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var user = context.Items["User"] as User;

        if(user != null && !user.IsAdmin)
        {
            context.Response.StatusCode = 403;
            await context.Response.WriteAsync("Acceso denegado. Necesitas ser Administrador");
            return;
        }
        await _next(context);
    }
}