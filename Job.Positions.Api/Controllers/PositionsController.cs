using Job.Positions.Api.Data;
using Job.Positions.Api.Models;
using Job.Positions.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Job.Positions.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PositionsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IRabbitMqPublisher _publisher;

    public PositionsController(
        ApplicationDbContext context,
        IRabbitMqPublisher publisher)
    {
        _context = context;
        _publisher = publisher;
    }

    [HttpGet]
    public IActionResult GetPositions()
    {
        return Ok(_context.Positions.ToList());
    }

    [HttpPost]
    public IActionResult CreatePosition(Position position)
    {
        if (position.Budget < 0)
            return BadRequest("Budget must be non-negative.");

        _context.Positions.Add(position);
        _context.SaveChanges();

        // Publish message
        _publisher.Publish($"Position created: {position.PositionNumber}");

        return CreatedAtAction(nameof(GetPositions), new { id = position.PositionNumber }, position);
    }

    [HttpPut("{id}")]
    public IActionResult UpdatePosition(int id, Position position)
    {
        var existingPosition = _context.Positions.Find(id);
        if (existingPosition == null)
            return NotFound();

        existingPosition.Title = position.Title;
        existingPosition.Budget = position.Budget;
        existingPosition.RecruiterId = position.RecruiterId;
        existingPosition.DepartmentId = position.DepartmentId;
        existingPosition.StatusId = position.StatusId;
        _context.SaveChanges();
        _publisher.Publish($"Position updated: {position.PositionNumber}");
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeletePosition(int id)
    {
        var position = _context.Positions.Find(id);
        if (position == null)
            return NotFound();

        _context.Positions.Remove(position);
        _context.SaveChanges();
        return NoContent();
    }
}