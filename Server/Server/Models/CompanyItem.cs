using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class CompanyItem
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string name { get; set; } //公司名稱
        public string englishName { get; set; } //公司英文名
        public string tel { get; set; } //電話
        public string fax { get; set; } //傳真
        public string no { get; set; }//公司統編
        public string postalCode { get; set; } //郵遞區號
        public string address { get; set; } //公司地址
        public string website { get; set; } 
        public int attr { get; set; } //公司屬性
         
        //客戶資料關聯性
        public List<Custom> Custom { get; set; }
    }
}
