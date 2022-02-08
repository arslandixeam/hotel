# Copyright (c) 2022, Arslan sheikh and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import base64


class TravelPortHotelImport(Document):
    def fetch_hotels(self):
        url = "https://americas.universal-api.travelport.com/B2BGateway/connect/uAPI/HotelService"

        auth = base64.b64encode('Universal API/uAPI3989408696-f1474d8f:H+j83kW*}A')

        headers = {
            'content-type': 'text/xml',
            'Authorization': f'Basic {auth}'
        }

        body = """<soapenv: Envelope xmlns: soapenv = "http://schemas.xmlsoap.org/soap/envelope/" >
					<soapenv: Header/>
						<soapenv: Body >
							<hot: HotelSearchAvailabilityReq xmlns: hot = "http://www.travelport.com/schema/hotel_v49_0" TargetBranch = "P3733743" >
								<com: BillingPointOfSaleInfo xmlns: com = "http://www.travelport.com/schema/common_v49_0" OriginApplication = "UAPI"/>
								
								<hot: HotelSearchLocation >
									<hot: HotelLocation xmlns: com = "http://www.travelport.com/schema/common_v49_0" Location = "IST" LocationType = "City" / >
								</hot: HotelSearchLocation >
							
								<hot: HotelSearchModifiers AvailableHotelsOnly = "false" MaxWait = "50000" NumberOfAdults = "1" >
									<com: PermittedProviders xmlns: com = "http://www.travelport.com/schema/common_v49_0" >
										<com: Provider Code = "1G"/>
									</com: PermittedProviders >
								</hot: HotelSearchModifiers >
							
								<hot: HotelStay >
									<hot: CheckinDate > 2022-03-15 < /hot:CheckinDate >
									<hot: CheckoutDate > 2022-03-17 < /hot:CheckoutDate >
								</hot: HotelStay >
							</hot: HotelSearchAvailabilityReq >
						</soapenv: Body >
					</soapenv: Envelope >"""

        response = requests.post(url, data=body, headers=headers)
        print(response.content)
