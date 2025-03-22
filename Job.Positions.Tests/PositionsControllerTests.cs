using Job.Positions.Api.Data;
using Job.Positions.Api.Models;
using Job.Positions.Api.Services;
using Moq;
using Job.Positions.Api.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Job.Positions.Tests;

[TestClass]
public class PositionsControllerTests
{
    private ApplicationDbContext _context;
    private Mock<IRabbitMqPublisher> _mockPublisher;
    private PositionsController _controller;

    [TestInitialize]
    public void Setup()
    {
        // Use an in-memory database for testing
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;
        _context = new ApplicationDbContext(options);
        _mockPublisher = new Mock<IRabbitMqPublisher>();
        _controller = new PositionsController(_context, _mockPublisher.Object);

        // Seed the in-memory database with test data
        _context.Positions.AddRange(new List<Position>
        {
            new Position { Title = "Developer", Budget = 5000 },
            new Position { Title = "Tester", Budget = 4000 }
        });
        _context.SaveChanges();
    }

    [TestMethod]
    public void GetPositions_ReturnsOkResult_WithPositionsList()
    {
        // Act
        var result = _controller.GetPositions() as OkObjectResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(200, result.StatusCode);
        Assert.IsInstanceOfType(result.Value, typeof(List<Position>));
        Assert.AreEqual(11, ((List<Position>)result.Value).Count);
    }

    [TestMethod]
    public void CreatePosition_ReturnsCreatedResult_AndPublishesMessage()
    {
        // Arrange
        var position = new Position {  Title = "Manager", Budget = 6000 };

        // Act
        var result = _controller.CreatePosition(position) as CreatedAtActionResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(201, result.StatusCode);
        _mockPublisher.Verify(p => p.Publish(It.Is<string>(s => s.Contains("Position created"))), Times.Once);
    }

    [TestMethod]
    public void UpdatePosition_ReturnsNoContentResult_WhenValid()
    {
        // Arrange
        var position = new Position { PositionNumber = 1, Title = "Developer", Budget = 5000 };

        var updatedPosition = new Position { Title = "Updated Developer", Budget = 5500 };

        // Act
        var result = _controller.UpdatePosition(1, updatedPosition) as NoContentResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(204, result.StatusCode);
    }

    [TestMethod]
    public void DeletePosition_ReturnsNoContentResult_WhenPositionExists()
    {
        // Act
        var result = _controller.DeletePosition(1) as NoContentResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(204, result.StatusCode);
    }

    [TestMethod]
    public void CreatePosition_ReturnsBadRequest_ForNegativeBudget()
    {
        // Arrange
        var position = new Position { PositionNumber = 4, Title = "Lead", Budget = -1000 };

        // Act
        var result = _controller.CreatePosition(position) as BadRequestObjectResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(400, result.StatusCode);
        Assert.AreEqual("Budget must be non-negative.", result.Value);
    }
}
