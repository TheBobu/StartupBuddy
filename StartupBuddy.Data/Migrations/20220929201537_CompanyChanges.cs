using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StartupBuddy.Data.Migrations
{
    public partial class CompanyChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Domain",
                table: "Companies",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<bool>(
                name: "Accountant",
                table: "Companies",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Employees",
                table: "Companies",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "SecondaryActivities",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "StockMarket",
                table: "Companies",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Accountant",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "Employees",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "SecondaryActivities",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "StockMarket",
                table: "Companies");

            migrationBuilder.AlterColumn<string>(
                name: "Domain",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
