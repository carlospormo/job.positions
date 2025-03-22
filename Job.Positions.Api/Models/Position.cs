using System.ComponentModel.DataAnnotations;

namespace Job.Positions.Api.Models;

public class Position
{
    [Key] 
    public int PositionNumber { get; set; }
    public string Title { get; set; }
    public int StatusId { get; set; }
    public int DepartmentId { get; set; }
    public int RecruiterId { get; set; }
    public decimal Budget { get; set; }
}
