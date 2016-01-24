using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Netponto.Models;

namespace Netponto.Controllers
{
    public class ItemsController : ApiController
    {
        private Item[] _items = new Item[] {
            new Item() { SubItems = new SubItem[] {
                new SubItem() { ImageUrl = "img/jshint-dark.png", Name = "JSHINT",
                    Description = "Validação de javascript." },
                new SubItem() { ImageUrl = "img/uglify.png", Name = "UGLIFY",
                    Description = "Compressão de javascripts." },
                new SubItem() { ImageUrl = "img/minify.png", Name = "MININFY",
                    Description = "Minificação de StyleSheets" },
                }
            },
            new Item() { SubItems = new SubItem[] {
                new SubItem() { ImageUrl = "img/imagemin.png", Name = "IMAGEMIN",
                    Description = "Utilização de um plugin para optimização de imagens." },
                new SubItem() { ImageUrl = "img/browsersync.png", Name = "BROWSERSYNC",
                    Description = "Testes sincronizados" },
                new SubItem() { ImageUrl = "img/watch.png", Name = "WATCH",
                    Description = "Re-utilizaçãode plugins e monitorização de alterações." },
                }
            },
            new Item() { SubItems = new SubItem[] {
                new SubItem() { ImageUrl = "img/errorhandling.png", Name = "ERROR HANDLING",
                    Description = "Tratamento de excepções" },
                new SubItem() { ImageUrl = "img/deploy.png", Name = "DEPLOY",
                    Description = "Vários ambientes de deployment" },
                new SubItem() { ImageUrl = "img/visualstudio.png", Name = "VISUAL STUDIO",
                    Description = "Integração como Visual Studio" },
                }
            }
        };

        public IEnumerable<Item> GetAllItems()
        {
            return _items;
        }
    }
}
