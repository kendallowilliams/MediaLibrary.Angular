using System;
using System.Threading.Tasks;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.DAL.Models;

namespace MediaLibrary.BLL.Services
{
    public class TrackService : ITrackService
    {
        private readonly IDataService dataService;

        public TrackService(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<int?> AddPath(string location)
        {

            int? id = default(int?);

            if (!string.IsNullOrWhiteSpace(location))
            {
                object parameters = new { location };
                TrackPath path = new TrackPath()
                    {
                        Location = location,
                        LastScanDate = DateTime.Now
                    },
                    dbPath = await dataService.Get<TrackPath>(item => item.Location.Trim() == location.Trim());

                if (dbPath != null) { id = dbPath.Id; }
                else
                {
                    await dataService.Insert(path);
                    id = path.Id;
                }
            }

            return id;
        }
    }
}