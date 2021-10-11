using Microsoft.EntityFrameworkCore.Migrations;

namespace _01_Many_To_Many.Migrations
{
    public partial class ImABozo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TacosHaveToppings_Topping_ToppingId",
                table: "TacosHaveToppings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Topping",
                table: "Topping");

            migrationBuilder.RenameTable(
                name: "Topping",
                newName: "Toppings");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Toppings",
                table: "Toppings",
                column: "ToppingId");

            migrationBuilder.AddForeignKey(
                name: "FK_TacosHaveToppings_Toppings_ToppingId",
                table: "TacosHaveToppings",
                column: "ToppingId",
                principalTable: "Toppings",
                principalColumn: "ToppingId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TacosHaveToppings_Toppings_ToppingId",
                table: "TacosHaveToppings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Toppings",
                table: "Toppings");

            migrationBuilder.RenameTable(
                name: "Toppings",
                newName: "Topping");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Topping",
                table: "Topping",
                column: "ToppingId");

            migrationBuilder.AddForeignKey(
                name: "FK_TacosHaveToppings_Topping_ToppingId",
                table: "TacosHaveToppings",
                column: "ToppingId",
                principalTable: "Topping",
                principalColumn: "ToppingId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
