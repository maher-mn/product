using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class productController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public productController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select name ,image,price from product";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("pro");
            MySqlDataReader myReader;
            using(MySqlConnection mycon  = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using(MySqlCommand mycommand =new MySqlCommand(query, mycon))
                {
                    myReader = mycommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    mycon.Close();

                }
                return new JsonResult(table);
            }
        }
    }
}
