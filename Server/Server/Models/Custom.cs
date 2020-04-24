using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Custom
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string name { get; set; }  //聯絡人姓名
        public string englishName { get; set; } //聯絡人英文名
        public string tel { get; set; } //聯絡人電話
        public string extension { get; set; } //聯絡人分機
        public string fax { get; set; } //傳真
        public string mobile { get; set; }  //聯絡人行動電話
        public string mail1 { get; set; }
        public string mail2 { get; set; }
        public bool acceptAds { get; set; } //是否接收電子報

        //Company 
       
        public int CompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public virtual CompanyItem Comany { get; set; }

    }
}
