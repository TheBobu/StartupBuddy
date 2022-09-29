using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StartupBuddy.Data.Migrations
{
    public partial class ChangePersonalInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ExperienceLevel",
                table: "PersonalInfos",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "PersonalInfos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "PersonalInfos");

            migrationBuilder.AlterColumn<string>(
                name: "ExperienceLevel",
                table: "PersonalInfos",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
