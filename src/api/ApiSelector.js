
import ApiConfig from './ApiConfig';
import TripApi from './TripApi';
import mockTripApi from './mockTripApi';

import WaypointApi from './WaypointApi';
import mockWaypointApi from './mockWaypointApi';

import PictureApi from './PictureApi';
import mockPictureApi from './mockPictureApi';

class ApiSelector
{
    static Picture(pictureId)
    {
        if (ApiConfig.OfflineMode)
        {
            return "/images/marker.png";
        }
        else
        {
            // TODO TZ Fix magic number
            return "http://localhost:15989//Pictures/Image?pictureId="+pictureId;
        }
    }

    static TripApi()
    {
        if (ApiConfig.OfflineMode)
            return mockTripApi;
        else
            return TripApi;
    }

    static WaypointApi()
    {
        if (ApiConfig.OfflineMode)
            return mockWaypointApi;
        else
            return WaypointApi;
    }

    static PictureApi()
    {
        if (ApiConfig.OfflineMode)
            return mockPictureApi;
        else
            return PictureApi;
    }    

}

export default ApiSelector;