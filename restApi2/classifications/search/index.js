'use strict';

var _ = require("underscore");
var Promise = require("bluebird");

// Require Logic
var lib = require('lib');
var createErrorMsg = lib.createErrorMsg;
var PromiseRequest = lib.PromiseRequest;

var config = require("config/env-config.js").config;

var sics = [
    {
        "code": "01",
        "description": "Agricultural Production - Crops"
    },
    {
        "code": "02",
        "description": "Agricultural Production - Livestock and Animal Specialties"
    },
    {
        "code": "07",
        "description": "Agricultural Services"
    },
    {
        "code": "08",
        "description": "Forestry"
    },
    {
        "code": "09",
        "description": "Fishing, Hunting and Trapping"
    },
    {
        "code": "10",
        "description": "Metal Mining"
    },
    {
        "code": "12",
        "description": "Coal Mining"
    },
    {
        "code": "13",
        "description": "Oil and Gas Extraction"
    },
    {
        "code": "14",
        "description": "Mining and Quarrying of Nonmetallic Minerals, Except Fuels"
    },
    {
        "code": "15",
        "description": "Construction - General Contractors & Operative Builders"
    },
    {
        "code": "16",
        "description": "Heamy Construction, Except Building Construction, Contractor"
    },
    {
        "code": "17",
        "description": "Construction - Special Trade Contractors"
    },
    {
        "code": "20",
        "description": "Food and Kindred Products"
    },
    {
        "code": "21",
        "description": "Tobacco Products"
    },
    {
        "code": "22",
        "description": "Textile Mill Products"
    },
    {
        "code": "23",
        "description": "Apparel, Finished Products from Fabrics & Similar Materials"
    },
    {
        "code": "24",
        "description": "Lumber and Wood Products, Except Furniture"
    },
    {
        "code": "25",
        "description": "Furniture and Fixtures"
    },
    {
        "code": "26",
        "description": "Paper and Allied Products"
    },
    {
        "code": "27",
        "description": "Printing, Publishing and Allied Industries"
    },
    {
        "code": "28",
        "description": "Chemicals and Allied Products"
    },
    {
        "code": "29",
        "description": "Petroleum Refining and Related Industries"
    },
    {
        "code": "30",
        "description": "Rubber and Miscellaneous Plastic Products"
    },
    {
        "code": "31",
        "description": "Leather and Leather Products"
    },
    {
        "code": "32",
        "description": "Stone, Clay, Glass, and Concrete Products"
    },
    {
        "code": "33",
        "description": "Primary Metal Industries"
    },
    {
        "code": "34",
        "description": "Fabricated Metal Products"
    },
    {
        "code": "35",
        "description": "Industrial and Commercial Machinery and Computer Equipment"
    },
    {
        "code": "36",
        "description": "Electronic & Other Electrical Equipment & Components"
    },
    {
        "code": "37",
        "description": "Transportation Equipment"
    },
    {
        "code": "38",
        "description": "Measuring, Photographic, Medical, & Optical Goods, & Clocks"
    },
    {
        "code": "39",
        "description": "Miscellaneous Manufacturing Industries"
    },
    {
        "code": "40",
        "description": "Railroad Transportation"
    },
    {
        "code": "41",
        "description": "Local & Suburban Transit & Interurban Highway Transportation"
    },
    {
        "code": "42",
        "description": "Motor Freight Transportation"
    },
    {
        "code": "43",
        "description": "United States Postal Service"
    },
    {
        "code": "44",
        "description": "Water Transportation"
    },
    {
        "code": "45",
        "description": "Transportation by Air"
    },
    {
        "code": "46",
        "description": "Pipelines, Except Natural Gas"
    },
    {
        "code": "47",
        "description": "Transportation Services"
    },
    {
        "code": "48",
        "description": "Communications"
    },
    {
        "code": "49",
        "description": "Electric, Gas and Sanitary Services"
    },
    {
        "code": "50",
        "description": "Wholesale Trade - Durable Goods"
    },
    {
        "code": "51",
        "description": "Wholesale Trade - Nondurable Goods"
    },
    {
        "code": "52",
        "description": "Building Materials, Hardware, Garden Supplies & Mobile Homes"
    },
    {
        "code": "53",
        "description": "General Merchandise Stores"
    },
    {
        "code": "54",
        "description": "Food Stores"
    },
    {
        "code": "55",
        "description": "Automotive Dealers and Gasoline Service Stations"
    },
    {
        "code": "56",
        "description": "Apparel and Accessory Stores"
    },
    {
        "code": "57",
        "description": "Home Furniture, Furnishings and Equipment Stores"
    },
    {
        "code": "58",
        "description": "Eating and Drinking Places"
    },
    {
        "code": "59",
        "description": "Miscellaneous Retail"
    },
    {
        "code": "60",
        "description": "Depository Institutions"
    },
    {
        "code": "61",
        "description": "Nondepository Credit Institutions"
    },
    {
        "code": "62",
        "description": "Security & Commodity Brokers, Dealers, Exchanges & Services"
    },
    {
        "code": "63",
        "description": "Insurance Carriers"
    },
    {
        "code": "64",
        "description": "Insurance Agents, Brokers and Service"
    },
    {
        "code": "65",
        "description": "Real Estate"
    },
    {
        "code": "67",
        "description": "Holding and Other Investment Offices"
    },
    {
        "code": "70",
        "description": "Hotels, Rooming Houses, Camps, and Other Lodging Places"
    },
    {
        "code": "72",
        "description": "Personal Services"
    },
    {
        "code": "73",
        "description": "Business Services"
    },
    {
        "code": "75",
        "description": "Automotive Repair, Services and Parking"
    },
    {
        "code": "76",
        "description": "Miscellaneous Repair Services"
    },
    {
        "code": "78",
        "description": "Motion Pictures"
    },
    {
        "code": "79",
        "description": "Amusement and Recreation Services"
    },
    {
        "code": "80",
        "description": "Health Services"
    },
    {
        "code": "81",
        "description": "Legal Services"
    },
    {
        "code": "82",
        "description": "Educational Services"
    },
    {
        "code": "83",
        "description": "Social Services"
    },
    {
        "code": "84",
        "description": "Museums, Art Galleries and Botanical and Zoological Gardens"
    },
    {
        "code": "86",
        "description": "Membership Organizations"
    },
    {
        "code": "87",
        "description": "Engineering, Accounting, Research, and Management Services"
    },
    {
        "code": "88",
        "description": "Private Households"
    },
    {
        "code": "89",
        "description": "Services, Not Elsewhere Classified"
    },
    {
        "code": "91",
        "description": "Executive, Legislative & General Government, Except Finance"
    },
    {
        "code": "92",
        "description": "Justice, Public Order and Safety"
    },
    {
        "code": "93",
        "description": "Public Finance, Taxation and Monetary Policy"
    },
    {
        "code": "94",
        "description": "Administration of Human Resource Programs"
    },
    {
        "code": "95",
        "description": "Administration of Environmental Quality and Housing Programs"
    },
    {
        "code": "96",
        "description": "Administration of Economic Programs"
    },
    {
        "code": "97",
        "description": "National Security and International Affairs"
    },
    {
        "code": "99",
        "description": "Nonclassifiable Establishments"
    },
    {
        "code": "011",
        "description": "Cash Grains"
    },
    {
        "code": "013",
        "description": "Field Crops, Except Cash Grains"
    },
    {
        "code": "016",
        "description": "Vegetables And Melons"
    },
    {
        "code": "017",
        "description": "Fruits And Tree Nuts"
    },
    {
        "code": "018",
        "description": "Horticultural Specialties"
    },
    {
        "code": "019",
        "description": "General Farms, Primarily Crop"
    },
    {
        "code": "021",
        "description": "Livestock, Except Dairy And Poultry"
    },
    {
        "code": "024",
        "description": "Dairy Farms"
    },
    {
        "code": "025",
        "description": "Poultry And Eggs"
    },
    {
        "code": "027",
        "description": "Animal Specialties"
    },
    {
        "code": "029",
        "description": "General Farms, Primarily Livestock And Animal Specialties"
    },
    {
        "code": "071",
        "description": "Soil Preparation Services"
    },
    {
        "code": "072",
        "description": "Crop Services"
    },
    {
        "code": "074",
        "description": "Veterinary Services"
    },
    {
        "code": "075",
        "description": "Animal Services, Except Veterinary"
    },
    {
        "code": "076",
        "description": "Farm Labor And Management Services"
    },
    {
        "code": "078",
        "description": "Landscape And Horticultural Services"
    },
    {
        "code": "081",
        "description": "Timber Tracts"
    },
    {
        "code": "083",
        "description": "Forest Nurseries And Gathering Of Forest Products"
    },
    {
        "code": "085",
        "description": "Forestry Services"
    },
    {
        "code": "091",
        "description": "Commercial Fishing"
    },
    {
        "code": "092",
        "description": "Fish Hatcheries And Preserves"
    },
    {
        "code": "097",
        "description": "Hunting And Trapping, And Game Propagation"
    },
    {
        "code": "101",
        "description": "Iron Ores"
    },
    {
        "code": "102",
        "description": "Copper Ores"
    },
    {
        "code": "103",
        "description": "Lead And Zinc Ores"
    },
    {
        "code": "104",
        "description": "Gold And Silver Ores"
    },
    {
        "code": "106",
        "description": "Ferroalloy Ores, Except Vanadium"
    },
    {
        "code": "108",
        "description": "Metal Mining Services"
    },
    {
        "code": "109",
        "description": "Miscellaneous Metal Ores"
    },
    {
        "code": "122",
        "description": "Bituminous Coal And Lignite Mining"
    },
    {
        "code": "123",
        "description": "Anthracite Mining"
    },
    {
        "code": "124",
        "description": "Coal Mining Services"
    },
    {
        "code": "131",
        "description": "Crude Petroleum And Natural Gas"
    },
    {
        "code": "132",
        "description": "Natural Gas Liquids"
    },
    {
        "code": "138",
        "description": "Oil And Gas Field Services"
    },
    {
        "code": "141",
        "description": "Dimension Stone"
    },
    {
        "code": "142",
        "description": "Crushed And Broken Stone, Including Riprap"
    },
    {
        "code": "144",
        "description": "Sand And Gravel"
    },
    {
        "code": "145",
        "description": "Clay, Ceramic, And Refractory Minerals"
    },
    {
        "code": "147",
        "description": "Chemical And Fertilizer Mineral Mining"
    },
    {
        "code": "148",
        "description": "Nonmetallic Minerals Services, Except Fuels"
    },
    {
        "code": "149",
        "description": "Miscellaneous Nonmetallic Minerals, Except Fuels"
    },
    {
        "code": "152",
        "description": "General Building Contractors-Residential Buildings"
    },
    {
        "code": "153",
        "description": "Operative Builders"
    },
    {
        "code": "154",
        "description": "General Building Contractors-Nonresidential Buildings"
    },
    {
        "code": "161",
        "description": "Highway And Street Construction, Except Elevated Highways"
    },
    {
        "code": "162",
        "description": "Heavy Construction, Except Highway And Street Construction"
    },
    {
        "code": "171",
        "description": "Plumbing, Heating And Air-Conditioning"
    },
    {
        "code": "172",
        "description": "Painting And Paper Hanging"
    },
    {
        "code": "173",
        "description": "Electrical Work"
    },
    {
        "code": "174",
        "description": "Masonry, Stonework, Tile Setting, And Plastering"
    },
    {
        "code": "175",
        "description": "Carpentry And Floor Work"
    },
    {
        "code": "176",
        "description": "Roofing, Siding, And Sheet Metal Work"
    },
    {
        "code": "177",
        "description": "Concrete Work"
    },
    {
        "code": "178",
        "description": "Water Well Drilling"
    },
    {
        "code": "179",
        "description": "Miscellaneous Special Trade Contractors"
    },
    {
        "code": "201",
        "description": "Meat Products"
    },
    {
        "code": "202",
        "description": "Dairy Products"
    },
    {
        "code": "203",
        "description": "Canned, Frozen, And Preserved Fruits, Vegetables, And Foodspecial"
    },
    {
        "code": "204",
        "description": "Grain Mill Products"
    },
    {
        "code": "205",
        "description": "Bakery Products"
    },
    {
        "code": "206",
        "description": "Sugar And Confectionery Products"
    },
    {
        "code": "207",
        "description": "Fats And Oils"
    },
    {
        "code": "208",
        "description": "Beverages"
    },
    {
        "code": "209",
        "description": "Miscellaneous Food Preparations And Kindred Products"
    },
    {
        "code": "211",
        "description": "Cigarettes"
    },
    {
        "code": "212",
        "description": "Cigars"
    },
    {
        "code": "213",
        "description": "Chewing And Smoking Tobacco And Snuff"
    },
    {
        "code": "214",
        "description": "Tobacco Stemming And Redrying"
    },
    {
        "code": "221",
        "description": "Broadwoven Fabric Mills, Cotton"
    },
    {
        "code": "222",
        "description": "Broadwoven Fabric Mills, Manmade Fiber And Silk"
    },
    {
        "code": "223",
        "description": "Broadwoven Fabric Mills, Wool (Including Dyeing Andfinishing)"
    },
    {
        "code": "224",
        "description": "Narrow Fabric And Other Smallwares Mills: Cotton, Wool, Silk,And"
    },
    {
        "code": "225",
        "description": "Knitting Mills"
    },
    {
        "code": "226",
        "description": "Dyeing And Finishing Textiles, Except Wool Fabrics And Knitgoods"
    },
    {
        "code": "227",
        "description": "Carpets And Rugs"
    },
    {
        "code": "228",
        "description": "Yarn And Thread Mills"
    },
    {
        "code": "229",
        "description": "Miscellaneous Textile Goods"
    },
    {
        "code": "231",
        "description": "Men'S And Boys' Suits, Coats, And Overcoats"
    },
    {
        "code": "232",
        "description": "Men'S And Boys' Furnishings, Work Clothing, And Alliedgarments"
    },
    {
        "code": "233",
        "description": "Women'S, Misses', And Juniors' Outerwear"
    },
    {
        "code": "234",
        "description": "Women'S, Misses', Children'S, And Infants' Undergarments"
    },
    {
        "code": "235",
        "description": "Hats, Caps, And Millinery"
    },
    {
        "code": "236",
        "description": "Girls', Children'S, And Infants' Outerwear"
    },
    {
        "code": "237",
        "description": "Fur Goods"
    },
    {
        "code": "238",
        "description": "Miscellaneous Apparel And Accessories"
    },
    {
        "code": "239",
        "description": "Miscellaneous Fabricated Textile Products"
    },
    {
        "code": "241",
        "description": "Logging"
    },
    {
        "code": "242",
        "description": "Sawmills And Planing Mills"
    },
    {
        "code": "243",
        "description": "Millwork, Veneer, Plywood, And Structural Wood Members"
    },
    {
        "code": "244",
        "description": "Wood Containers"
    },
    {
        "code": "245",
        "description": "Wood Buildings And Mobile Homes"
    },
    {
        "code": "249",
        "description": "Miscellaneous Wood Products"
    },
    {
        "code": "251",
        "description": "Household Furniture"
    },
    {
        "code": "252",
        "description": "Office Furniture"
    },
    {
        "code": "253",
        "description": "Public Building And Related Furniture"
    },
    {
        "code": "254",
        "description": "Partitions, Shelving, Lockers, And Office And Store Fixtures"
    },
    {
        "code": "259",
        "description": "Miscellaneous Furniture And Fixtures"
    },
    {
        "code": "261",
        "description": "Pulp Mills"
    },
    {
        "code": "262",
        "description": "Paper Mills"
    },
    {
        "code": "263",
        "description": "Paperboard Mills"
    },
    {
        "code": "265",
        "description": "Paperboard Containers And Boxes"
    },
    {
        "code": "267",
        "description": "Converted Paper And Paperboard Products, Except Containersand Box"
    },
    {
        "code": "271",
        "description": "Newspapers: Publishing, Or Publishing And Printing"
    },
    {
        "code": "272",
        "description": "Periodicals: Publishing, Or Publishing And Printing"
    },
    {
        "code": "273",
        "description": "Books"
    },
    {
        "code": "274",
        "description": "Miscellaneous Publishing"
    },
    {
        "code": "275",
        "description": "Commercial Printing"
    },
    {
        "code": "276",
        "description": "Manifold Business Forms"
    },
    {
        "code": "277",
        "description": "Greeting Cards"
    },
    {
        "code": "278",
        "description": "Blankbooks, Looseleaf Binders, And Bookbinding And Relatedwork"
    },
    {
        "code": "279",
        "description": "Service Industries For The Printing Trade"
    },
    {
        "code": "281",
        "description": "Industrial Inorganic Chemicals"
    },
    {
        "code": "282",
        "description": "Plastics Materials And Synthetic Resins, Synthetic Rubber,Cellulo"
    },
    {
        "code": "283",
        "description": "Drugs"
    },
    {
        "code": "284",
        "description": "Soap, Detergents, And Cleaning Preparations; Perfumes,Cosmetics,"
    },
    {
        "code": "285",
        "description": "Paints, Varnishes, Lacquers, Enamels, And Allied Products"
    },
    {
        "code": "286",
        "description": "Industrial Organic Chemicals"
    },
    {
        "code": "287",
        "description": "Agricultural Chemicals"
    },
    {
        "code": "289",
        "description": "Miscellaneous Chemical Products"
    },
    {
        "code": "291",
        "description": "Petroleum Refining"
    },
    {
        "code": "295",
        "description": "Asphalt Paving And Roofing Materials"
    },
    {
        "code": "299",
        "description": "Miscellaneous Products Of Petroleum And Coal"
    },
    {
        "code": "301",
        "description": "Tires And Inner Tubes"
    },
    {
        "code": "302",
        "description": "Rubber And Plastics Footwear"
    },
    {
        "code": "305",
        "description": "Gaskets, Packing, And Sealing Devices And Rubber And Plasticshose"
    },
    {
        "code": "306",
        "description": "Fabricated Rubber Products, not elsewhere classified"
    },
    {
        "code": "308",
        "description": "Miscellaneous Plastics Products"
    },
    {
        "code": "311",
        "description": "Leather Tanning And Finishing"
    },
    {
        "code": "313",
        "description": "Boot And Shoe Cut Stock And Findings"
    },
    {
        "code": "314",
        "description": "Footwear, Except Rubber"
    },
    {
        "code": "315",
        "description": "Leather Gloves And Mittens"
    },
    {
        "code": "316",
        "description": "Luggage"
    },
    {
        "code": "317",
        "description": "Handbags And Other Personal Leather Goods"
    },
    {
        "code": "319",
        "description": "Leather Goods, not elsewhere classified"
    },
    {
        "code": "321",
        "description": "Flat Glass"
    },
    {
        "code": "322",
        "description": "Glass And Glassware, Pressed Or Blown"
    },
    {
        "code": "323",
        "description": "Glass Products, Made Of Purchased Glass"
    },
    {
        "code": "324",
        "description": "Cement, Hydraulic"
    },
    {
        "code": "325",
        "description": "Structural Clay Products"
    },
    {
        "code": "326",
        "description": "Pottery And Related Products"
    },
    {
        "code": "327",
        "description": "Concrete, Gypsum, And Plaster Products"
    },
    {
        "code": "328",
        "description": "Cut Stone And Stone Products"
    },
    {
        "code": "329",
        "description": "Abrasive, Asbestos, And Miscellaneous Nonmetallic Mineralproducts"
    },
    {
        "code": "331",
        "description": "Steel Works, Blast Furnaces, And Rolling And Finishing Mills"
    },
    {
        "code": "332",
        "description": "Iron And Steel Foundries"
    },
    {
        "code": "333",
        "description": "Primary Smelting And Refining Of Nonferrous Metals"
    },
    {
        "code": "334",
        "description": "Secondary Smelting And Refining Of Nonferrous Metals"
    },
    {
        "code": "335",
        "description": "Rolling, Drawing, And Extruding Of Nonferrous Metals"
    },
    {
        "code": "336",
        "description": "Nonferrous Foundries (Castings)"
    },
    {
        "code": "339",
        "description": "Miscellaneous Primary Metal Products"
    },
    {
        "code": "341",
        "description": "Metal Cans And Shipping Containers"
    },
    {
        "code": "342",
        "description": "Cutlery, Handtools, And General Hardware"
    },
    {
        "code": "343",
        "description": "Heating Equipment, Except Electric And Warm Air; And Plumbingfixt"
    },
    {
        "code": "344",
        "description": "Fabricated Structural Metal Products"
    },
    {
        "code": "345",
        "description": "Screw Machine Products, And Bolts, Nuts, Screws, Rivets, Andwashe"
    },
    {
        "code": "346",
        "description": "Metal Forgings And Stampings"
    },
    {
        "code": "347",
        "description": "Coating, Engraving, And Allied Services"
    },
    {
        "code": "348",
        "description": "Ordnance And Accessories, Except Vehicles And Guided Missiles"
    },
    {
        "code": "349",
        "description": "Miscellaneous Fabricated Metal Products"
    },
    {
        "code": "351",
        "description": "Engines And Turbines"
    },
    {
        "code": "352",
        "description": "Farm And Garden Machinery And Equipment"
    },
    {
        "code": "353",
        "description": "Construction, Mining, And Materials Handling Machinery Andequipme"
    },
    {
        "code": "354",
        "description": "Metalworking Machinery And Equipment"
    },
    {
        "code": "355",
        "description": "Special Industry Machinery, Except Metalworking Machinery"
    },
    {
        "code": "356",
        "description": "General Industrial Machinery And Equipment"
    },
    {
        "code": "357",
        "description": "Computer And Office Equipment"
    },
    {
        "code": "358",
        "description": "Refrigeration And Service Industry Machinery"
    },
    {
        "code": "359",
        "description": "Miscellaneous Industrial And Commercial Machinery Andequipment"
    },
    {
        "code": "361",
        "description": "Electric Transmission And Distribution Equipment"
    },
    {
        "code": "362",
        "description": "Electrical Industrial Apparatus"
    },
    {
        "code": "363",
        "description": "Household Appliances"
    },
    {
        "code": "364",
        "description": "Electric Lighting And Wiring Equipment"
    },
    {
        "code": "365",
        "description": "Household Audio And Video Equipment, And Audio Recordings"
    },
    {
        "code": "366",
        "description": "Communications Equipment"
    },
    {
        "code": "367",
        "description": "Electronic Components And Accessories"
    },
    {
        "code": "369",
        "description": "Miscellaneous Electrical Machinery, Equipment, And Supplies"
    },
    {
        "code": "371",
        "description": "Motor Vehicles And Motor Vehicle Equipment"
    },
    {
        "code": "372",
        "description": "Aircraft And Parts"
    },
    {
        "code": "373",
        "description": "Ship And Boat Building And Repairing"
    },
    {
        "code": "374",
        "description": "Railroad Equipment"
    },
    {
        "code": "375",
        "description": "Motorcycles, Bicycles, And Parts"
    },
    {
        "code": "376",
        "description": "Guided Missiles And Space Vehicles And Parts"
    },
    {
        "code": "379",
        "description": "Miscellaneous Transportation Equipment"
    },
    {
        "code": "381",
        "description": "Search, Detection, Navigation, Guidance, Aeronautical, Andnautica"
    },
    {
        "code": "382",
        "description": "Laboratory Apparatus And Analytical, Optical, Measuring, Andcontr"
    },
    {
        "code": "384",
        "description": "Surgical, Medical, And Dental Instruments And Supplies"
    },
    {
        "code": "385",
        "description": "Ophthalmic Goods"
    },
    {
        "code": "386",
        "description": "Photographic Equipment And Supplies"
    },
    {
        "code": "387",
        "description": "Watches, Clocks, Clockwork Operated Devices, And Parts"
    },
    {
        "code": "391",
        "description": "Jewelry, Silverware, And Plated Ware"
    },
    {
        "code": "393",
        "description": "Musical Instruments"
    },
    {
        "code": "394",
        "description": "Dolls, Toys, Games And Sporting And Athletic Goods"
    },
    {
        "code": "395",
        "description": "Pens, Pencils, And Other Artists' Materials"
    },
    {
        "code": "396",
        "description": "Costume Jewelry, Costume Novelties, Buttons, Andmiscellaneous Not"
    },
    {
        "code": "399",
        "description": "Miscellaneous Manufacturing Industries"
    },
    {
        "code": "401",
        "description": "Railroads"
    },
    {
        "code": "411",
        "description": "Local And Suburban Passenger Transportation"
    },
    {
        "code": "412",
        "description": "Taxicabs"
    },
    {
        "code": "413",
        "description": "Intercity And Rural Bus Transportation"
    },
    {
        "code": "414",
        "description": "Bus Charter Service"
    },
    {
        "code": "415",
        "description": "School Buses"
    },
    {
        "code": "417",
        "description": "Terminal And Service Facilities For Motor Vehicle Passengertransp"
    },
    {
        "code": "421",
        "description": "Trucking And Courier Services, Except Air"
    },
    {
        "code": "422",
        "description": "Public Warehousing And Storage"
    },
    {
        "code": "423",
        "description": "Terminal And Joint Terminal Maintenance Facilities For Motorfreig"
    },
    {
        "code": "431",
        "description": "United States Postal Service"
    },
    {
        "code": "441",
        "description": "Deep Sea Foreign Transportation Of Freight"
    },
    {
        "code": "442",
        "description": "Deep Sea Domestic Transportation Of Freight"
    },
    {
        "code": "443",
        "description": "Freight Transportation On The Great Lakes&Amp;Die;St.Lawrence Seaway"
    },
    {
        "code": "444",
        "description": "Water Transportation Of Freight, not elsewhere classified"
    },
    {
        "code": "448",
        "description": "Water Transportation Of Passengers"
    },
    {
        "code": "449",
        "description": "Services Incidental To Water Transportation"
    },
    {
        "code": "451",
        "description": "Air Transportation, Scheduled, And Air Courier Services"
    },
    {
        "code": "452",
        "description": "Air Transportation, Nonscheduled"
    },
    {
        "code": "458",
        "description": "Airports, Flying Fields, And Airport Terminal Services"
    },
    {
        "code": "461",
        "description": "Pipelines, Except Natural Gas"
    },
    {
        "code": "472",
        "description": "Arrangement Of Passenger Transportation"
    },
    {
        "code": "473",
        "description": "Arrangement Of Transportation Of Freight And Cargo"
    },
    {
        "code": "474",
        "description": "Rental Of Railroad Cars"
    },
    {
        "code": "478",
        "description": "Miscellaneous Services Incidental To Transportation"
    },
    {
        "code": "481",
        "description": "Telephone Communications"
    },
    {
        "code": "482",
        "description": "Telegraph And Other Message Communications"
    },
    {
        "code": "483",
        "description": "Radio And Television Broadcasting Stations"
    },
    {
        "code": "484",
        "description": "Cable And Other Pay Television Services"
    },
    {
        "code": "489",
        "description": "Communications Services, not elsewhere classified"
    },
    {
        "code": "491",
        "description": "Electric Services"
    },
    {
        "code": "492",
        "description": "Gas Production And Distribution"
    },
    {
        "code": "764",
        "description": "Reupholstery And Furniture Repair"
    },
    {
        "code": "493",
        "description": "Combination Electric And Gas, And Other Utility Services"
    },
    {
        "code": "494",
        "description": "Water Supply"
    },
    {
        "code": "495",
        "description": "Sanitary Services"
    },
    {
        "code": "496",
        "description": "Steam And Air-Conditioning Supply"
    },
    {
        "code": "497",
        "description": "Irrigation Systems"
    },
    {
        "code": "501",
        "description": "Motor Vehicles And Motor Vehicle Parts And Supplies"
    },
    {
        "code": "502",
        "description": "Furniture And Homefurnishings"
    },
    {
        "code": "503",
        "description": "Lumber And Other Construction Materials"
    },
    {
        "code": "504",
        "description": "Professional And Commercial Equipment And Supplies"
    },
    {
        "code": "505",
        "description": "Metals And Minerals, Except Petroleum"
    },
    {
        "code": "506",
        "description": "Electrical Goods"
    },
    {
        "code": "507",
        "description": "Hardware, And Plumbing And Heating Equipment And Supplies"
    },
    {
        "code": "508",
        "description": "Machinery, Equipment, And Supplies"
    },
    {
        "code": "509",
        "description": "Miscellaneous Durable Goods"
    },
    {
        "code": "511",
        "description": "Paper And Paper Products"
    },
    {
        "code": "512",
        "description": "Drugs, Drug Proprietaries, And Druggists' Sundries"
    },
    {
        "code": "513",
        "description": "Apparel, Piece Goods, And Notions"
    },
    {
        "code": "514",
        "description": "Groceries And Related Products"
    },
    {
        "code": "515",
        "description": "Farm-Product Raw Materials"
    },
    {
        "code": "516",
        "description": "Chemicals And Allied Products"
    },
    {
        "code": "517",
        "description": "Petroleum And Petroleum Products"
    },
    {
        "code": "518",
        "description": "Beer, Wine, And Distilled Alcoholic Beverages"
    },
    {
        "code": "519",
        "description": "Miscellaneous Nondurable Goods"
    },
    {
        "code": "521",
        "description": "Lumber And Other Building Materials Dealers"
    },
    {
        "code": "523",
        "description": "Paint, Glass, And Wallpaper Stores"
    },
    {
        "code": "525",
        "description": "Hardware Stores"
    },
    {
        "code": "526",
        "description": "Retail Nurseries, Lawn And Garden Supply Stores"
    },
    {
        "code": "527",
        "description": "Mobile Home Dealers"
    },
    {
        "code": "531",
        "description": "Department Stores"
    },
    {
        "code": "533",
        "description": "Variety Stores"
    },
    {
        "code": "539",
        "description": "Miscellaneous General Merchandise Stores"
    },
    {
        "code": "541",
        "description": "Grocery Stores"
    },
    {
        "code": "542",
        "description": "Meat And Fish (Seafood) Markets, Including Freezerprovisioners"
    },
    {
        "code": "543",
        "description": "Fruit And Vegetable Markets"
    },
    {
        "code": "544",
        "description": "Candy, Nut, And Confectionery Stores"
    },
    {
        "code": "545",
        "description": "Dairy Products Stores"
    },
    {
        "code": "546",
        "description": "Retail Bakeries"
    },
    {
        "code": "549",
        "description": "Miscellaneous Food Stores"
    },
    {
        "code": "551",
        "description": "Motor Vehicle Dealers (New And Used)"
    },
    {
        "code": "552",
        "description": "Motor Vehicle Dealers (Used Only)"
    },
    {
        "code": "553",
        "description": "Auto And Home Supply Stores"
    },
    {
        "code": "554",
        "description": "Gasoline Service Stations"
    },
    {
        "code": "555",
        "description": "Boat Dealers"
    },
    {
        "code": "556",
        "description": "Recreational Vehicle Dealers"
    },
    {
        "code": "557",
        "description": "Motorcycle Dealers"
    },
    {
        "code": "559",
        "description": "Automotive Dealers, not elsewhere classified"
    },
    {
        "code": "561",
        "description": "Men'S And Boys' Clothing And Accessory Stores"
    },
    {
        "code": "562",
        "description": "Women'S Clothing Stores"
    },
    {
        "code": "563",
        "description": "Women'S Accessory And Specialty Stores"
    },
    {
        "code": "564",
        "description": "Children'S And Infants' Wear Stores"
    },
    {
        "code": "565",
        "description": "Family Clothing Stores"
    },
    {
        "code": "566",
        "description": "Shoe Stores"
    },
    {
        "code": "569",
        "description": "Miscellaneous Apparel And Accessory Stores"
    },
    {
        "code": "571",
        "description": "Home Furniture And Furnishings Stores"
    },
    {
        "code": "572",
        "description": "Household Appliance Stores"
    },
    {
        "code": "573",
        "description": "Radio, Television, Consumer Electronics, And Music Stores"
    },
    {
        "code": "581",
        "description": "Eating And Drinking Places"
    },
    {
        "code": "591",
        "description": "Drug Stores And Proprietary Stores"
    },
    {
        "code": "592",
        "description": "Liquor Stores"
    },
    {
        "code": "593",
        "description": "Used Merchandise Stores"
    },
    {
        "code": "594",
        "description": "Miscellaneous Shopping Goods Stores"
    },
    {
        "code": "596",
        "description": "Nonstore Retailers"
    },
    {
        "code": "598",
        "description": "Fuel Dealers"
    },
    {
        "code": "599",
        "description": "Retail Stores, not elsewhere classified"
    },
    {
        "code": "601",
        "description": "Central Reserve Depository Institutions"
    },
    {
        "code": "602",
        "description": "Commercial Banks"
    },
    {
        "code": "603",
        "description": "Savings Institutions"
    },
    {
        "code": "606",
        "description": "Credit Unions"
    },
    {
        "code": "608",
        "description": "Foreign Banking And Branches And Agencies Of Foreign Banks"
    },
    {
        "code": "609",
        "description": "Functions Related To Depository Banking"
    },
    {
        "code": "611",
        "description": "Federal And Federally-Sponsored Credit Agencies"
    },
    {
        "code": "614",
        "description": "Personal Credit Institutions"
    },
    {
        "code": "615",
        "description": "Business Credit Institutions"
    },
    {
        "code": "616",
        "description": "Mortgage Bankers And Brokers"
    },
    {
        "code": "621",
        "description": "Security Brokers, Dealers, And Flotation Companies"
    },
    {
        "code": "622",
        "description": "Commodity Contracts Brokers And Dealers"
    },
    {
        "code": "623",
        "description": "Security And Commodity Exchanges"
    },
    {
        "code": "628",
        "description": "Services Allied With The Exchange Of Securities Orcommodities"
    },
    {
        "code": "631",
        "description": "Life Insurance"
    },
    {
        "code": "632",
        "description": "Accident And Health Insurance And Medical Service Plans"
    },
    {
        "code": "633",
        "description": "Fire, Marine, And Casualty Insurance"
    },
    {
        "code": "635",
        "description": "Surety Insurance"
    },
    {
        "code": "636",
        "description": "Title Insurance"
    },
    {
        "code": "637",
        "description": "Pension, Health, And Welfare Funds"
    },
    {
        "code": "639",
        "description": "Insurance Carriers, not elsewhere classified"
    },
    {
        "code": "641",
        "description": "Insurance Agents, Brokers, And Service"
    },
    {
        "code": "651",
        "description": "Real Estate Operators (Except Developers) And Lessors"
    },
    {
        "code": "653",
        "description": "Real Estate Agents And Managers"
    },
    {
        "code": "654",
        "description": "Title Abstract Offices"
    },
    {
        "code": "655",
        "description": "Land Subdividers And Developers"
    },
    {
        "code": "671",
        "description": "Holding Offices"
    },
    {
        "code": "672",
        "description": "Investment Offices"
    },
    {
        "code": "673",
        "description": "Trusts"
    },
    {
        "code": "679",
        "description": "Miscellaneous Investing"
    },
    {
        "code": "701",
        "description": "Hotels And Motels"
    },
    {
        "code": "702",
        "description": "Rooming And Boarding Houses"
    },
    {
        "code": "703",
        "description": "Camps And Recreational Vehicle Parks"
    },
    {
        "code": "704",
        "description": "Organization Hotels And Lodging Houses, On Membership Basis"
    },
    {
        "code": "721",
        "description": "Laundry, Cleaning, And Garment Services"
    },
    {
        "code": "722",
        "description": "Photographic Studios, Portrait"
    },
    {
        "code": "723",
        "description": "Beauty Shops"
    },
    {
        "code": "724",
        "description": "Barber Shops"
    },
    {
        "code": "725",
        "description": "Shoe Repair Shops And Shoeshine Parlors"
    },
    {
        "code": "726",
        "description": "Funeral Service And Crematories"
    },
    {
        "code": "729",
        "description": "Miscellaneous Personal Services"
    },
    {
        "code": "731",
        "description": "Advertising"
    },
    {
        "code": "732",
        "description": "Consumer Credit Reporting Agencies, Mercantile Reportingagencies,"
    },
    {
        "code": "733",
        "description": "Mailing, Reproduction, Commercial Art And Photography, Andstenogr"
    },
    {
        "code": "734",
        "description": "Services To Dwellings And Other Buildings"
    },
    {
        "code": "735",
        "description": "Miscellaneous Equipment Rental And Leasing"
    },
    {
        "code": "736",
        "description": "Personnel Supply Services"
    },
    {
        "code": "737",
        "description": "Computer Programming, Data Processing, And Other Computerrelated"
    },
    {
        "code": "738",
        "description": "Miscellaneous Business Services"
    },
    {
        "code": "751",
        "description": "Automotive Rental And Leasing, Without Drivers"
    },
    {
        "code": "752",
        "description": "Automobile Parking"
    },
    {
        "code": "753",
        "description": "Automotive Repair Shops"
    },
    {
        "code": "754",
        "description": "Automotive Services, Except Repair"
    },
    {
        "code": "762",
        "description": "Electrical Repair Shops"
    },
    {
        "code": "763",
        "description": "Watch, Clock, And Jewelry Repair"
    },
    {
        "code": "769",
        "description": "Miscellaneous Repair Shops And Related Services"
    },
    {
        "code": "781",
        "description": "Motion Picture Production And Allied Services"
    },
    {
        "code": "782",
        "description": "Motion Picture Distribution And Allied Services"
    },
    {
        "code": "783",
        "description": "Motion Picture Theaters"
    },
    {
        "code": "784",
        "description": "Video Tape Rental"
    },
    {
        "code": "791",
        "description": "Dance Studios, Schools, And Halls"
    },
    {
        "code": "792",
        "description": "Theatrical Producers (Except Motion Picture), Bands,Orchestras, A"
    },
    {
        "code": "793",
        "description": "Bowling Centers"
    },
    {
        "code": "794",
        "description": "Commercial Sports"
    },
    {
        "code": "799",
        "description": "Miscellaneous Amusement And Recreation Services"
    },
    {
        "code": "801",
        "description": "Offices And Clinics Of Doctors Of Medicine"
    },
    {
        "code": "802",
        "description": "Offices And Clinics Of Dentists"
    },
    {
        "code": "803",
        "description": "Offices And Clinics Of Doctors Of Osteopathy"
    },
    {
        "code": "804",
        "description": "Offices And Clinics Of Other Health Practitioners"
    },
    {
        "code": "805",
        "description": "Nursing And Personal Care Facilities"
    },
    {
        "code": "806",
        "description": "Hospitals"
    },
    {
        "code": "807",
        "description": "Medical And Dental Laboratories"
    },
    {
        "code": "808",
        "description": "Home Health Care Services"
    },
    {
        "code": "809",
        "description": "Miscellaneous Health And Allied Services, Not Elsewhereclassified"
    },
    {
        "code": "811",
        "description": "Legal Services"
    },
    {
        "code": "821",
        "description": "Elementary And Secondary Schools"
    },
    {
        "code": "822",
        "description": "Colleges, Universities, Professional Schools, And Juniorcolleges"
    },
    {
        "code": "823",
        "description": "Libraries"
    },
    {
        "code": "824",
        "description": "Vocational Schools"
    },
    {
        "code": "829",
        "description": "Schools And Educational Services, not elsewhere classified"
    },
    {
        "code": "832",
        "description": "Individual And Family Social Services"
    },
    {
        "code": "833",
        "description": "Job Training And Vocational Rehabilitation Services"
    },
    {
        "code": "835",
        "description": "Child Day Care Services"
    },
    {
        "code": "836",
        "description": "Residential Care"
    },
    {
        "code": "839",
        "description": "Social Services, not elsewhere classified"
    },
    {
        "code": "841",
        "description": "Museums And Art Galleries"
    },
    {
        "code": "842",
        "description": "Arboreta And Botanical Or Zoological Gardens"
    },
    {
        "code": "861",
        "description": "Business Associations"
    },
    {
        "code": "862",
        "description": "Professional Membership Organizations"
    },
    {
        "code": "863",
        "description": "Labor Unions And Similar Labor Organizations"
    },
    {
        "code": "864",
        "description": "Civic, Social, And Fraternal Associations"
    },
    {
        "code": "865",
        "description": "Political Organizations"
    },
    {
        "code": "866",
        "description": "Religious Organizations"
    },
    {
        "code": "869",
        "description": "Membership Organizations, not elsewhere classified"
    },
    {
        "code": "871",
        "description": "Engineering, Architectural, And Surveying Services"
    },
    {
        "code": "872",
        "description": "Accounting, Auditing, And Bookkeeping Services"
    },
    {
        "code": "873",
        "description": "Research, Development, And Testing Services"
    },
    {
        "code": "874",
        "description": "Management And Public Relations Services"
    },
    {
        "code": "881",
        "description": "Private Households"
    },
    {
        "code": "899",
        "description": "Services, not elsewhere classified"
    },
    {
        "code": "911",
        "description": "Executive Offices"
    },
    {
        "code": "912",
        "description": "Legislative Bodies"
    },
    {
        "code": "913",
        "description": "Executive And Legislative Offices Combined"
    },
    {
        "code": "919",
        "description": "General Government, not elsewhere classified"
    },
    {
        "code": "921",
        "description": "Courts"
    },
    {
        "code": "922",
        "description": "Public Order And Safety"
    },
    {
        "code": "931",
        "description": "Public Finance, Taxation, And Monetary Policy"
    },
    {
        "code": "941",
        "description": "Administration Of Educational Programs"
    },
    {
        "code": "943",
        "description": "Administration Of Public Health Programs"
    },
    {
        "code": "944",
        "description": "Administration Of Social, Human Resource And Incomemaintenance Pr"
    },
    {
        "code": "945",
        "description": "Administration Of Veterans' Affairs, Except Health Andinsurance"
    },
    {
        "code": "951",
        "description": "Administration Of Environmental Quality Programs"
    },
    {
        "code": "953",
        "description": "Administration Of Housing And Urban Development Programs"
    },
    {
        "code": "961",
        "description": "Administration Of General Economic Programs"
    },
    {
        "code": "962",
        "description": "Regulation And Administration Of Transportation Programs"
    },
    {
        "code": "963",
        "description": "Regulation And Administration Of Communications, Electric,Gas, An"
    },
    {
        "code": "964",
        "description": "Regulation Of Agricultural Marketing And Commodities"
    },
    {
        "code": "965",
        "description": "Regulation, Licensing, And Inspection Of Miscellaneouscommercial"
    },
    {
        "code": "966",
        "description": "Space Research And Technology"
    },
    {
        "code": "971",
        "description": "National Security"
    },
    {
        "code": "972",
        "description": "International Affairs"
    },
    {
        "code": "0111",
        "description": "Wheat"
    },
    {
        "code": "0112",
        "description": "Rice"
    },
    {
        "code": "0115",
        "description": "Corn"
    },
    {
        "code": "0116",
        "description": "Soybeans"
    },
    {
        "code": "0119",
        "description": "Cash grains, nec"
    },
    {
        "code": "0131",
        "description": "Cotton"
    },
    {
        "code": "0132",
        "description": "Tobacco"
    },
    {
        "code": "0133",
        "description": "Sugarcane and sugar beets"
    },
    {
        "code": "0134",
        "description": "Irish potatoes"
    },
    {
        "code": "0139",
        "description": "Field crops, except cash grain"
    },
    {
        "code": "0161",
        "description": "Vegetables and melons"
    },
    {
        "code": "0171",
        "description": "Berry crops"
    },
    {
        "code": "0172",
        "description": "Grapes"
    },
    {
        "code": "0173",
        "description": "Tree nuts"
    },
    {
        "code": "0174",
        "description": "Citrus fruits"
    },
    {
        "code": "0175",
        "description": "Deciduous tree fruits"
    },
    {
        "code": "0179",
        "description": "Fruits and tree nuts, nec"
    },
    {
        "code": "0181",
        "description": "Ornamental nursery products"
    },
    {
        "code": "0182",
        "description": "Food crops grown under cover"
    },
    {
        "code": "0191",
        "description": "General farms, primarily crop"
    },
    {
        "code": "0211",
        "description": "Beef cattle feedlots"
    },
    {
        "code": "0212",
        "description": "Beef cattle, except feedlots"
    },
    {
        "code": "0213",
        "description": "Hogs"
    },
    {
        "code": "0214",
        "description": "Sheep and goats"
    },
    {
        "code": "0219",
        "description": "General livestock, nec"
    },
    {
        "code": "0241",
        "description": "Dairy farms"
    },
    {
        "code": "0251",
        "description": "Broiler, fryer, and roaster chickens"
    },
    {
        "code": "0252",
        "description": "Chicken eggs"
    },
    {
        "code": "0253",
        "description": "Turkeys and turkey eggs"
    },
    {
        "code": "0254",
        "description": "Poultry hatcheries"
    },
    {
        "code": "0259",
        "description": "Poultry and eggs, nec"
    },
    {
        "code": "0271",
        "description": "Fur-bearing animals and rabbits"
    },
    {
        "code": "0272",
        "description": "Horses and other equines"
    },
    {
        "code": "0273",
        "description": "Animal aquaculture"
    },
    {
        "code": "0279",
        "description": "Animal specialties, nec"
    },
    {
        "code": "0291",
        "description": "General farms, primarily animals"
    },
    {
        "code": "0711",
        "description": "Soil preparation services"
    },
    {
        "code": "0721",
        "description": "Crop planting and protection"
    },
    {
        "code": "0722",
        "description": "Crop harvesting"
    },
    {
        "code": "0723",
        "description": "Crop preparation services for market"
    },
    {
        "code": "0724",
        "description": "Cotton ginning"
    },
    {
        "code": "0741",
        "description": "Veterinary services for livestock"
    },
    {
        "code": "0742",
        "description": "Veterinary services, specialties"
    },
    {
        "code": "0751",
        "description": "Livestock services, except veterinary"
    },
    {
        "code": "0752",
        "description": "Animal specialty services"
    },
    {
        "code": "0761",
        "description": "Farm labor contractors"
    },
    {
        "code": "0762",
        "description": "Farm management services"
    },
    {
        "code": "0781",
        "description": "Landscape counseling and planning"
    },
    {
        "code": "0782",
        "description": "Lawn and garden services"
    },
    {
        "code": "0783",
        "description": "Ornamental shrub and tree services"
    },
    {
        "code": "0811",
        "description": "Timber tracts"
    },
    {
        "code": "0831",
        "description": "Forest products"
    },
    {
        "code": "0851",
        "description": "Forestry services"
    },
    {
        "code": "0912",
        "description": "Finfish"
    },
    {
        "code": "0913",
        "description": "Shellfish"
    },
    {
        "code": "0919",
        "description": "Miscellaneous marine products"
    },
    {
        "code": "0921",
        "description": "Fish hatcheries and preserves"
    },
    {
        "code": "0971",
        "description": "Hunting, trapping, game propagation"
    },
    {
        "code": "1011",
        "description": "Iron ores"
    },
    {
        "code": "1021",
        "description": "Copper ores"
    },
    {
        "code": "1031",
        "description": "Lead and zinc ores"
    },
    {
        "code": "1041",
        "description": "Gold ores"
    },
    {
        "code": "1044",
        "description": "Silver ores"
    },
    {
        "code": "1061",
        "description": "Ferroalloy ores, except vanadium"
    },
    {
        "code": "1081",
        "description": "Metal mining services"
    },
    {
        "code": "1094",
        "description": "Uranium-radium-vanadium ores"
    },
    {
        "code": "1099",
        "description": "Metal ores, nec"
    },
    {
        "code": "1221",
        "description": "Bituminous coal and lignite-surface mining"
    },
    {
        "code": "1222",
        "description": "Bituminous coal-underground mining"
    },
    {
        "code": "1231",
        "description": "Anthracite mining"
    },
    {
        "code": "1241",
        "description": "Coal mining services"
    },
    {
        "code": "1311",
        "description": "Crude petroleum and natural gas"
    },
    {
        "code": "1321",
        "description": "Natural gas liquids"
    },
    {
        "code": "1381",
        "description": "Drilling oil and gas wells"
    },
    {
        "code": "1382",
        "description": "Oil and gas exploration services"
    },
    {
        "code": "1389",
        "description": "Oil and gas field services, nec"
    },
    {
        "code": "1411",
        "description": "Dimension stone"
    },
    {
        "code": "1422",
        "description": "Crushed and broken limestone"
    },
    {
        "code": "1423",
        "description": "Crushed and broken granite"
    },
    {
        "code": "1429",
        "description": "Crushed and broken stone, nec"
    },
    {
        "code": "1442",
        "description": "Construction sand and gravel"
    },
    {
        "code": "1446",
        "description": "Industrial sand"
    },
    {
        "code": "1455",
        "description": "Kaolin and ball clay"
    },
    {
        "code": "1459",
        "description": "Clay and related minerals, nec"
    },
    {
        "code": "1474",
        "description": "Potash, soda, and borate minerals"
    },
    {
        "code": "1475",
        "description": "Phosphate rock"
    },
    {
        "code": "1479",
        "description": "Chemical and fertilizer mining"
    },
    {
        "code": "1481",
        "description": "Nonmetallic mineral services"
    },
    {
        "code": "1499",
        "description": "Miscellaneous nonmetallic mining"
    },
    {
        "code": "1521",
        "description": "Single-family housing construction"
    },
    {
        "code": "1522",
        "description": "Residential construction, nec"
    },
    {
        "code": "1531",
        "description": "Operative builders"
    },
    {
        "code": "1541",
        "description": "Industrial buildings and warehouses"
    },
    {
        "code": "1542",
        "description": "Nonresidential construction, nec"
    },
    {
        "code": "1611",
        "description": "Highway and street construction"
    },
    {
        "code": "1622",
        "description": "Bridge, tunnel, and elevated highway"
    },
    {
        "code": "1623",
        "description": "Water, sewer, and utility lines"
    },
    {
        "code": "1629",
        "description": "Heavy construction, nec"
    },
    {
        "code": "1711",
        "description": "Plumbing, heating, air-conditioning"
    },
    {
        "code": "1721",
        "description": "Painting and paper hanging"
    },
    {
        "code": "1731",
        "description": "Electrical work"
    },
    {
        "code": "1741",
        "description": "Masonry and other stonework"
    },
    {
        "code": "1742",
        "description": "Plastering, drywall, and insulation"
    },
    {
        "code": "1743",
        "description": "Terrazzo, tile, marble, mosaic work"
    },
    {
        "code": "1751",
        "description": "Carpentry work"
    },
    {
        "code": "1752",
        "description": "Floor laying and floor work, nec"
    },
    {
        "code": "1761",
        "description": "Roofing, siding, and sheetmetal work"
    },
    {
        "code": "1771",
        "description": "Concrete work"
    },
    {
        "code": "1781",
        "description": "Water well drilling"
    },
    {
        "code": "1791",
        "description": "Structural steel erection"
    },
    {
        "code": "1793",
        "description": "Glass and glazing work"
    },
    {
        "code": "1794",
        "description": "Excavation work"
    },
    {
        "code": "1795",
        "description": "Wrecking and demolition work"
    },
    {
        "code": "1796",
        "description": "Installing building equipment"
    },
    {
        "code": "1799",
        "description": "Special trade contractors, nec"
    },
    {
        "code": "2011",
        "description": "Meat packing plants"
    },
    {
        "code": "2013",
        "description": "Sausages and other prepared meats"
    },
    {
        "code": "2015",
        "description": "Poultry slaughtering and processing"
    },
    {
        "code": "2021",
        "description": "Creamery butter"
    },
    {
        "code": "2022",
        "description": "Cheese; natural and processed"
    },
    {
        "code": "2023",
        "description": "Dry, condensed, evaporated products"
    },
    {
        "code": "2024",
        "description": "Ice cream and frozen deserts"
    },
    {
        "code": "2026",
        "description": "Fluid milk"
    },
    {
        "code": "2032",
        "description": "Canned specialties"
    },
    {
        "code": "2033",
        "description": "Canned fruits and specialties"
    },
    {
        "code": "2034",
        "description": "Dehydrated fruits, vegetables, soups"
    },
    {
        "code": "2035",
        "description": "Pickles, sauces, and salad dressings"
    },
    {
        "code": "2037",
        "description": "Frozen fruits and vegetables"
    },
    {
        "code": "2038",
        "description": "Frozen specialties, nec"
    },
    {
        "code": "2041",
        "description": "Flour and other grain mill products"
    },
    {
        "code": "2043",
        "description": "Cereal breakfast foods"
    },
    {
        "code": "2044",
        "description": "Rice milling"
    },
    {
        "code": "2045",
        "description": "Prepared flour mixes and doughs"
    },
    {
        "code": "2046",
        "description": "Wet corn milling"
    },
    {
        "code": "2047",
        "description": "Dog and cat food"
    },
    {
        "code": "2048",
        "description": "Prepared feeds, nec"
    },
    {
        "code": "2051",
        "description": "Bread, cake, and related products"
    },
    {
        "code": "2052",
        "description": "Cookies and crackers"
    },
    {
        "code": "2053",
        "description": "Frozen bakery products, except bread"
    },
    {
        "code": "2061",
        "description": "Raw cane sugar"
    },
    {
        "code": "2062",
        "description": "Cane sugar refining"
    },
    {
        "code": "2063",
        "description": "Beet sugar"
    },
    {
        "code": "2064",
        "description": "Candy and other confectionery products"
    },
    {
        "code": "2066",
        "description": "Chocolate and cocoa products"
    },
    {
        "code": "2067",
        "description": "Chewing gum"
    },
    {
        "code": "2068",
        "description": "Salted and roasted nuts and seeds"
    },
    {
        "code": "2074",
        "description": "Cottonseed oil mills"
    },
    {
        "code": "2075",
        "description": "Soybean oil mills"
    },
    {
        "code": "2076",
        "description": "Vegetable oil mills, nec"
    },
    {
        "code": "2077",
        "description": "Animal and marine fats and oils"
    },
    {
        "code": "2079",
        "description": "Edible fats and oils"
    },
    {
        "code": "2082",
        "description": "Malt beverages"
    },
    {
        "code": "2083",
        "description": "Malt"
    },
    {
        "code": "2084",
        "description": "Wines, brandy, and brandy spirits"
    },
    {
        "code": "2085",
        "description": "Distilled and blended liquors"
    },
    {
        "code": "2086",
        "description": "Bottled and canned soft drinks"
    },
    {
        "code": "2087",
        "description": "Flavoring extracts and syrups, nec"
    },
    {
        "code": "2091",
        "description": "Canned and cured fish and seafoods"
    },
    {
        "code": "2092",
        "description": "Fresh or frozen packaged fish"
    },
    {
        "code": "2095",
        "description": "Roasted coffee"
    },
    {
        "code": "2096",
        "description": "Potato chips and similar snacks"
    },
    {
        "code": "2097",
        "description": "Manufactured ice"
    },
    {
        "code": "2098",
        "description": "Macaroni and spaghetti"
    },
    {
        "code": "2099",
        "description": "Food preparations, nec"
    },
    {
        "code": "2111",
        "description": "Cigarettes"
    },
    {
        "code": "2121",
        "description": "Cigars"
    },
    {
        "code": "2131",
        "description": "Chewing and smoking tobacco"
    },
    {
        "code": "2141",
        "description": "Tobacco stemming and redrying"
    },
    {
        "code": "2211",
        "description": "Broadwoven fabric mills, cotton"
    },
    {
        "code": "2221",
        "description": "Broadwoven fabric mills, manmade"
    },
    {
        "code": "2231",
        "description": "Broadwoven fabric mills, wool"
    },
    {
        "code": "2241",
        "description": "Narrow fabric mills"
    },
    {
        "code": "2251",
        "description": "Women's hosiery, except socks"
    },
    {
        "code": "2252",
        "description": "Hosiery, nec"
    },
    {
        "code": "2253",
        "description": "Knit outerwear mills"
    },
    {
        "code": "2254",
        "description": "Knit underwear mills"
    },
    {
        "code": "2257",
        "description": "Weft knit fabric mills"
    },
    {
        "code": "2258",
        "description": "Lace and warp knit fabric mills"
    },
    {
        "code": "2259",
        "description": "Knitting mills, nec"
    },
    {
        "code": "2261",
        "description": "Finishing plants, cotton"
    },
    {
        "code": "2262",
        "description": "Finishing plants, manmade"
    },
    {
        "code": "2269",
        "description": "Finishing plants, nec"
    },
    {
        "code": "2273",
        "description": "Carpets and rugs"
    },
    {
        "code": "2281",
        "description": "Yarn spinning mills"
    },
    {
        "code": "2282",
        "description": "Throwing and winding mills"
    },
    {
        "code": "2284",
        "description": "Thread mills"
    },
    {
        "code": "2295",
        "description": "Coated fabrics, not rubberized"
    },
    {
        "code": "2296",
        "description": "Tire cord and fabrics"
    },
    {
        "code": "2297",
        "description": "Nonwoven fabrics"
    },
    {
        "code": "2298",
        "description": "Cordage and twine"
    },
    {
        "code": "2299",
        "description": "Textile goods, nec"
    },
    {
        "code": "2311",
        "description": "Men's and boy's suits and coats"
    },
    {
        "code": "2321",
        "description": "Men's and boy's furnishings"
    },
    {
        "code": "2322",
        "description": "Men's and boy's underwear and nightwear"
    },
    {
        "code": "2323",
        "description": "Men's and boy's neckwear"
    },
    {
        "code": "2325",
        "description": "Men's and boy's trousers and slacks"
    },
    {
        "code": "2326",
        "description": "Men's and boy's work clothing"
    },
    {
        "code": "2329",
        "description": "Men's and boy's clothing, nec"
    },
    {
        "code": "2331",
        "description": "Women's and misses' blouses and shirts"
    },
    {
        "code": "2335",
        "description": "Women's, junior's, and misses' dresses"
    },
    {
        "code": "2337",
        "description": "Women's and misses' suits and coats"
    },
    {
        "code": "2339",
        "description": "Women's and misses' outerwear, nec"
    },
    {
        "code": "2341",
        "description": "Women's and children's underwear"
    },
    {
        "code": "2342",
        "description": "Bras, girdles, and allied garments"
    },
    {
        "code": "2353",
        "description": "Hats, caps, and millinery"
    },
    {
        "code": "2361",
        "description": "Girl's and children's dresses, blouses"
    },
    {
        "code": "2369",
        "description": "Girl's and children's outerwear, nec"
    },
    {
        "code": "2371",
        "description": "Fur goods"
    },
    {
        "code": "2381",
        "description": "Fabric dress and work gloves"
    },
    {
        "code": "2384",
        "description": "Robes and dressing gowns"
    },
    {
        "code": "2385",
        "description": "Waterproof outerwear"
    },
    {
        "code": "2386",
        "description": "Leather and sheep-lined clothing"
    },
    {
        "code": "2387",
        "description": "Apparel belts"
    },
    {
        "code": "2389",
        "description": "Apparel and accessories, nec"
    },
    {
        "code": "2391",
        "description": "Curtains and draperies"
    },
    {
        "code": "2392",
        "description": "Household furnishings, nec"
    },
    {
        "code": "2393",
        "description": "Textile bags"
    },
    {
        "code": "2394",
        "description": "Canvas and related products"
    },
    {
        "code": "2395",
        "description": "Pleating and stitching"
    },
    {
        "code": "2396",
        "description": "Automotive and apparel trimmings"
    },
    {
        "code": "2397",
        "description": "Schiffli machine embroideries"
    },
    {
        "code": "2399",
        "description": "Fabricated textile products, nec"
    },
    {
        "code": "2411",
        "description": "Logging"
    },
    {
        "code": "2421",
        "description": "Sawmills and planing mills, general"
    },
    {
        "code": "2426",
        "description": "Hardwood dimension and flooring mills"
    },
    {
        "code": "2429",
        "description": "Special product sawmills, nec"
    },
    {
        "code": "2431",
        "description": "Millwork"
    },
    {
        "code": "2434",
        "description": "Wood kitchen cabinets"
    },
    {
        "code": "2435",
        "description": "Hardwood veneer and plywood"
    },
    {
        "code": "2436",
        "description": "Softwood veneer and plywood"
    },
    {
        "code": "2439",
        "description": "Structural wood members, nec"
    },
    {
        "code": "2441",
        "description": "Nailed wood boxes and shook"
    },
    {
        "code": "2448",
        "description": "Wood pallets and skids"
    },
    {
        "code": "2449",
        "description": "Wood containers, nec"
    },
    {
        "code": "2451",
        "description": "Mobile homes"
    },
    {
        "code": "2452",
        "description": "Prefabricated wood buildings"
    },
    {
        "code": "2491",
        "description": "Wood preserving"
    },
    {
        "code": "2493",
        "description": "Reconstituted wood products"
    },
    {
        "code": "2499",
        "description": "Wood products, nec"
    },
    {
        "code": "2511",
        "description": "Wood household furniture"
    },
    {
        "code": "2512",
        "description": "Upholstered household furniture"
    },
    {
        "code": "2514",
        "description": "Metal household furniture"
    },
    {
        "code": "2515",
        "description": "Mattresses and bedsprings"
    },
    {
        "code": "2517",
        "description": "Wood television and radio cabinets"
    },
    {
        "code": "2519",
        "description": "Household furniture, nec"
    },
    {
        "code": "2521",
        "description": "Wood office furniture"
    },
    {
        "code": "2522",
        "description": "Office furniture, except wood"
    },
    {
        "code": "2531",
        "description": "Public building and related furniture"
    },
    {
        "code": "2541",
        "description": "Wood partitions and fixtures"
    },
    {
        "code": "2542",
        "description": "Partitions and fixtures, except wood"
    },
    {
        "code": "2591",
        "description": "Drapery hardware and blinds and shades"
    },
    {
        "code": "2599",
        "description": "Furniture and fixtures, nec"
    },
    {
        "code": "2611",
        "description": "Pulp mills"
    },
    {
        "code": "2621",
        "description": "Paper mills"
    },
    {
        "code": "2631",
        "description": "Paperboard mills"
    },
    {
        "code": "2652",
        "description": "Setup paperboard boxes"
    },
    {
        "code": "2653",
        "description": "Corrugated and solid fiber boxes"
    },
    {
        "code": "2655",
        "description": "Fiber cans, drums, and similar products"
    },
    {
        "code": "2656",
        "description": "Sanitary food containers"
    },
    {
        "code": "2657",
        "description": "Folding paperboard boxes"
    },
    {
        "code": "2671",
        "description": "Paper; coated and laminated packaging"
    },
    {
        "code": "2672",
        "description": "Paper; coated and laminated, nec"
    },
    {
        "code": "2673",
        "description": "Bags: plastic, laminated, and coated"
    },
    {
        "code": "2674",
        "description": "Bags: uncoated paper and multiwall"
    },
    {
        "code": "2675",
        "description": "Die-cut paper and board"
    },
    {
        "code": "2676",
        "description": "Sanitary paper products"
    },
    {
        "code": "2677",
        "description": "Envelopes"
    },
    {
        "code": "2678",
        "description": "Stationery products"
    },
    {
        "code": "2679",
        "description": "Converted paper products, nec"
    },
    {
        "code": "2711",
        "description": "Newspapers"
    },
    {
        "code": "2721",
        "description": "Periodicals"
    },
    {
        "code": "2731",
        "description": "Book publishing"
    },
    {
        "code": "2732",
        "description": "Book printing"
    },
    {
        "code": "2741",
        "description": "Miscellaneous publishing"
    },
    {
        "code": "2752",
        "description": "Commercial printing, lithographic"
    },
    {
        "code": "2754",
        "description": "Commercial printing, gravure"
    },
    {
        "code": "2759",
        "description": "Commercial printing, nec"
    },
    {
        "code": "2761",
        "description": "Manifold business forms"
    },
    {
        "code": "2771",
        "description": "Greeting cards"
    },
    {
        "code": "2782",
        "description": "Blankbooks and looseleaf binders"
    },
    {
        "code": "2789",
        "description": "Bookbinding and related work"
    },
    {
        "code": "2791",
        "description": "Typesetting"
    },
    {
        "code": "2796",
        "description": "Platemaking services"
    },
    {
        "code": "2812",
        "description": "Alkalies and chlorine"
    },
    {
        "code": "2813",
        "description": "Industrial gases"
    },
    {
        "code": "2816",
        "description": "Inorganic pigments"
    },
    {
        "code": "2819",
        "description": "Industrial inorganic chemicals, nec"
    },
    {
        "code": "2821",
        "description": "Plastics materials and resins"
    },
    {
        "code": "2822",
        "description": "Synthetic rubber"
    },
    {
        "code": "2823",
        "description": "Cellulosic manmade fibers"
    },
    {
        "code": "2824",
        "description": "Organic fibers, noncellulosic"
    },
    {
        "code": "2833",
        "description": "Medicinals and botanicals"
    },
    {
        "code": "2834",
        "description": "Pharmaceutical preparations"
    },
    {
        "code": "2835",
        "description": "Diagnostic substances"
    },
    {
        "code": "2836",
        "description": "Biological products, except diagnostic"
    },
    {
        "code": "2841",
        "description": "Soap and other detergents"
    },
    {
        "code": "2842",
        "description": "Polishes and sanitation goods"
    },
    {
        "code": "2843",
        "description": "Surface active agents"
    },
    {
        "code": "2844",
        "description": "Toilet preparations"
    },
    {
        "code": "2851",
        "description": "Paints and allied products"
    },
    {
        "code": "2861",
        "description": "Gum and wood chemicals"
    },
    {
        "code": "2865",
        "description": "Cyclic crudes and intermediates"
    },
    {
        "code": "2869",
        "description": "Industrial organic chemicals, nec"
    },
    {
        "code": "2873",
        "description": "Nitrogenous fertilizers"
    },
    {
        "code": "2874",
        "description": "Phosphatic fertilizers"
    },
    {
        "code": "2875",
        "description": "Fertilizers, mixing only"
    },
    {
        "code": "2879",
        "description": "Agricultural chemicals, nec"
    },
    {
        "code": "2891",
        "description": "Adhesives and sealants"
    },
    {
        "code": "2892",
        "description": "Explosives"
    },
    {
        "code": "2893",
        "description": "Printing ink"
    },
    {
        "code": "2895",
        "description": "Carbon black"
    },
    {
        "code": "2899",
        "description": "Chemical preparations, nec"
    },
    {
        "code": "2911",
        "description": "Petroleum refining"
    },
    {
        "code": "2951",
        "description": "Asphalt paving mixtures and blocks"
    },
    {
        "code": "2952",
        "description": "Asphalt felts and coatings"
    },
    {
        "code": "2992",
        "description": "Lubricating oils and greases"
    },
    {
        "code": "2999",
        "description": "Petroleum and coal products, nec"
    },
    {
        "code": "3011",
        "description": "Tires and inner tubes"
    },
    {
        "code": "3021",
        "description": "Rubber and plastics footwear"
    },
    {
        "code": "3052",
        "description": "Rubber and plastics hose and beltings"
    },
    {
        "code": "3053",
        "description": "Gaskets; packing and sealing devices"
    },
    {
        "code": "3061",
        "description": "Mechanical rubber goods"
    },
    {
        "code": "3069",
        "description": "Fabricated rubber products, nec"
    },
    {
        "code": "3081",
        "description": "Unsupported plastics film and sheet"
    },
    {
        "code": "3082",
        "description": "Unsupported plastics profile shapes"
    },
    {
        "code": "3083",
        "description": "Laminated plastics plate and sheet"
    },
    {
        "code": "3084",
        "description": "Plastics pipe"
    },
    {
        "code": "3085",
        "description": "Plastics bottles"
    },
    {
        "code": "3086",
        "description": "Plastics foam products"
    },
    {
        "code": "3087",
        "description": "Custom compound purchased resins"
    },
    {
        "code": "3088",
        "description": "Plastics plumbing fixtures"
    },
    {
        "code": "3089",
        "description": "Plastics products, nec"
    },
    {
        "code": "3111",
        "description": "Leather tanning and finishing"
    },
    {
        "code": "3131",
        "description": "Footwear cut stock"
    },
    {
        "code": "3142",
        "description": "House slippers"
    },
    {
        "code": "3143",
        "description": "Men's footwear, except athletic"
    },
    {
        "code": "3144",
        "description": "Women's footwear, except athletic"
    },
    {
        "code": "3149",
        "description": "Footwear, except rubber, nec"
    },
    {
        "code": "3151",
        "description": "Leather gloves and mittens"
    },
    {
        "code": "3161",
        "description": "Luggage"
    },
    {
        "code": "3171",
        "description": "Women's handbags and purses"
    },
    {
        "code": "3172",
        "description": "Personal leather goods, nec"
    },
    {
        "code": "3199",
        "description": "Leather goods, nec"
    },
    {
        "code": "3211",
        "description": "Flat glass"
    },
    {
        "code": "3221",
        "description": "Glass containers"
    },
    {
        "code": "3229",
        "description": "Pressed and blown glass, nec"
    },
    {
        "code": "3231",
        "description": "Products of purchased glass"
    },
    {
        "code": "3241",
        "description": "Cement, hydraulic"
    },
    {
        "code": "3251",
        "description": "Brick and structural clay tile"
    },
    {
        "code": "3253",
        "description": "Ceramic wall and floor tile"
    },
    {
        "code": "3255",
        "description": "Clay refractories"
    },
    {
        "code": "3259",
        "description": "Structural clay products, nec"
    },
    {
        "code": "3261",
        "description": "Vitreous plumbing fixtures"
    },
    {
        "code": "3262",
        "description": "Vitreous china table and kitchenware"
    },
    {
        "code": "3263",
        "description": "Semivitreous table and kitchenware"
    },
    {
        "code": "3264",
        "description": "Porcelain electrical supplies"
    },
    {
        "code": "3269",
        "description": "Pottery products, nec"
    },
    {
        "code": "3271",
        "description": "Concrete block and brick"
    },
    {
        "code": "3272",
        "description": "Concrete products, nec"
    },
    {
        "code": "3273",
        "description": "Ready-mixed concrete"
    },
    {
        "code": "3274",
        "description": "Lime"
    },
    {
        "code": "3275",
        "description": "Gypsum products"
    },
    {
        "code": "3281",
        "description": "Cut stone and stone products"
    },
    {
        "code": "3291",
        "description": "Abrasive products"
    },
    {
        "code": "3292",
        "description": "Asbestos products"
    },
    {
        "code": "3295",
        "description": "Minerals, ground or treated"
    },
    {
        "code": "3296",
        "description": "Mineral wool"
    },
    {
        "code": "3297",
        "description": "Nonclay refractories"
    },
    {
        "code": "3299",
        "description": "Nonmetallic mineral products,"
    },
    {
        "code": "3312",
        "description": "Blast furnaces and steel mills"
    },
    {
        "code": "3313",
        "description": "Electrometallurgical products"
    },
    {
        "code": "3315",
        "description": "Steel wire and related products"
    },
    {
        "code": "3316",
        "description": "Cold finishing of steel shapes"
    },
    {
        "code": "3317",
        "description": "Steel pipe and tubes"
    },
    {
        "code": "3321",
        "description": "Gray and ductile iron foundries"
    },
    {
        "code": "3322",
        "description": "Malleable iron foundries"
    },
    {
        "code": "3324",
        "description": "Steel investment foundries"
    },
    {
        "code": "3325",
        "description": "Steel foundries, nec"
    },
    {
        "code": "3331",
        "description": "Primary copper"
    },
    {
        "code": "3334",
        "description": "Primary aluminum"
    },
    {
        "code": "3339",
        "description": "Primary nonferrous metals, nec"
    },
    {
        "code": "3341",
        "description": "Secondary nonferrous metals"
    },
    {
        "code": "3351",
        "description": "Copper rolling and drawing"
    },
    {
        "code": "3353",
        "description": "Aluminum sheet, plate, and foil"
    },
    {
        "code": "3354",
        "description": "Aluminum extruded products"
    },
    {
        "code": "3355",
        "description": "Aluminum rolling and drawing, nec"
    },
    {
        "code": "3356",
        "description": "Nonferrous rolling and drawing, nec"
    },
    {
        "code": "3357",
        "description": "Nonferrous wiredrawing and insulating"
    },
    {
        "code": "3363",
        "description": "Aluminum die-castings"
    },
    {
        "code": "3364",
        "description": "Nonferrous die-castings except aluminum"
    },
    {
        "code": "3365",
        "description": "Aluminum foundries"
    },
    {
        "code": "3366",
        "description": "Copper foundries"
    },
    {
        "code": "3369",
        "description": "Nonferrous foundries, nec"
    },
    {
        "code": "3398",
        "description": "Metal heat treating"
    },
    {
        "code": "3399",
        "description": "Primary metal products"
    },
    {
        "code": "3411",
        "description": "Metal cans"
    },
    {
        "code": "3412",
        "description": "Metal barrels, drums, and pails"
    },
    {
        "code": "3421",
        "description": "Cutlery"
    },
    {
        "code": "3423",
        "description": "Hand and edge tools, nec"
    },
    {
        "code": "3425",
        "description": "Saw blades and handsaws"
    },
    {
        "code": "3429",
        "description": "Hardware, nec"
    },
    {
        "code": "3431",
        "description": "Metal sanitary ware"
    },
    {
        "code": "3432",
        "description": "Plumbing fixture fittings and trim"
    },
    {
        "code": "3433",
        "description": "Heating equipment, except electric"
    },
    {
        "code": "3441",
        "description": "Fabricated structural metal"
    },
    {
        "code": "3442",
        "description": "Metal doors, sash, and trim"
    },
    {
        "code": "3443",
        "description": "Fabricated plate work (boiler shop)"
    },
    {
        "code": "3444",
        "description": "Sheet metalwork"
    },
    {
        "code": "3446",
        "description": "Architectural metalwork"
    },
    {
        "code": "3448",
        "description": "Prefabricated metal buildings"
    },
    {
        "code": "3449",
        "description": "Miscellaneous metalwork"
    },
    {
        "code": "3451",
        "description": "Screw machine products"
    },
    {
        "code": "3452",
        "description": "Bolts, nuts, rivets, and washers"
    },
    {
        "code": "3462",
        "description": "Iron and steel forgings"
    },
    {
        "code": "3463",
        "description": "Nonferrous forgings"
    },
    {
        "code": "3465",
        "description": "Automotive stampings"
    },
    {
        "code": "3466",
        "description": "Crowns and closures"
    },
    {
        "code": "3469",
        "description": "Metal stampings, nec"
    },
    {
        "code": "3471",
        "description": "Plating and polishing"
    },
    {
        "code": "3479",
        "description": "Metal coating and allied services"
    },
    {
        "code": "3482",
        "description": "Small arms ammunition"
    },
    {
        "code": "3483",
        "description": "Ammunition, except for small arms, nec"
    },
    {
        "code": "3484",
        "description": "Small arms"
    },
    {
        "code": "3489",
        "description": "Ordnance and accessories, nec"
    },
    {
        "code": "3491",
        "description": "Industrial valves"
    },
    {
        "code": "3492",
        "description": "Fluid power valves and hose fittings"
    },
    {
        "code": "3493",
        "description": "Steel springs, except wire"
    },
    {
        "code": "3494",
        "description": "Valves and pipe fittings, nec"
    },
    {
        "code": "3495",
        "description": "Wire springs"
    },
    {
        "code": "3496",
        "description": "Miscellaneous fabricated wire products"
    },
    {
        "code": "3497",
        "description": "Metal foil and leaf"
    },
    {
        "code": "3498",
        "description": "Fabricated pipe and fittings"
    },
    {
        "code": "3499",
        "description": "Fabricated metal products, nec"
    },
    {
        "code": "3511",
        "description": "Turbines and turbine generator sets"
    },
    {
        "code": "3519",
        "description": "Internal combustion engines, nec"
    },
    {
        "code": "3523",
        "description": "Farm machinery and equipment"
    },
    {
        "code": "3524",
        "description": "Lawn and garden equipment"
    },
    {
        "code": "3531",
        "description": "Construction machinery"
    },
    {
        "code": "3532",
        "description": "Mining machinery"
    },
    {
        "code": "3533",
        "description": "Oil and gas field machinery"
    },
    {
        "code": "3534",
        "description": "Elevators and moving stairways"
    },
    {
        "code": "3535",
        "description": "Conveyors and conveying equipment"
    },
    {
        "code": "3536",
        "description": "Hoists, cranes, and monorails"
    },
    {
        "code": "3537",
        "description": "Industrial trucks and tractors"
    },
    {
        "code": "3541",
        "description": "Machine tools, metal cutting type"
    },
    {
        "code": "3542",
        "description": "Machine tools, metal forming type"
    },
    {
        "code": "3543",
        "description": "Industrial patterns"
    },
    {
        "code": "3544",
        "description": "Special dies, tools, jigs, and fixtures"
    },
    {
        "code": "3545",
        "description": "Machine tool accessories"
    },
    {
        "code": "3546",
        "description": "Power-driven handtools"
    },
    {
        "code": "3547",
        "description": "Rolling mill machinery"
    },
    {
        "code": "3548",
        "description": "Welding apparatus"
    },
    {
        "code": "3549",
        "description": "Metalworking machinery, nec"
    },
    {
        "code": "3552",
        "description": "Textile machinery"
    },
    {
        "code": "3553",
        "description": "Woodworking machinery"
    },
    {
        "code": "3554",
        "description": "Paper industries machinery"
    },
    {
        "code": "3555",
        "description": "Printing trades machinery"
    },
    {
        "code": "3556",
        "description": "Food products machinery"
    },
    {
        "code": "3559",
        "description": "Special industry machinery, nec"
    },
    {
        "code": "3561",
        "description": "Pumps and pumping equipment"
    },
    {
        "code": "3562",
        "description": "Ball and roller bearings"
    },
    {
        "code": "3563",
        "description": "Air and gas compressors"
    },
    {
        "code": "3564",
        "description": "Blowers and fans"
    },
    {
        "code": "3565",
        "description": "Packaging machinery"
    },
    {
        "code": "3566",
        "description": "Speed changers, drives, and gears"
    },
    {
        "code": "3567",
        "description": "Industrial furnaces and ovens"
    },
    {
        "code": "3568",
        "description": "Power transmission equipment, nec"
    },
    {
        "code": "3569",
        "description": "General industrial machinery,"
    },
    {
        "code": "3571",
        "description": "Electronic computers"
    },
    {
        "code": "3572",
        "description": "Computer storage devices"
    },
    {
        "code": "3575",
        "description": "Computer terminals"
    },
    {
        "code": "3577",
        "description": "Computer peripheral equipment, nec"
    },
    {
        "code": "3578",
        "description": "Calculating and accounting equipment"
    },
    {
        "code": "3579",
        "description": "Office machines, nec"
    },
    {
        "code": "3581",
        "description": "Automatic vending machines"
    },
    {
        "code": "3582",
        "description": "Commercial laundry equipment"
    },
    {
        "code": "3585",
        "description": "Refrigeration and heating equipment"
    },
    {
        "code": "3586",
        "description": "Measuring and dispensing pumps"
    },
    {
        "code": "3589",
        "description": "Service industry machinery, nec"
    },
    {
        "code": "3592",
        "description": "Carburetors, pistons, rings, valves"
    },
    {
        "code": "3593",
        "description": "Fluid power cylinders and actuators"
    },
    {
        "code": "3594",
        "description": "Fluid power pumps and motors"
    },
    {
        "code": "3596",
        "description": "Scales and balances, except laboratory"
    },
    {
        "code": "3599",
        "description": "Industrial machinery, nec"
    },
    {
        "code": "3612",
        "description": "Transformers, except electric"
    },
    {
        "code": "3613",
        "description": "Switchgear and switchboard apparatus"
    },
    {
        "code": "3621",
        "description": "Motors and generators"
    },
    {
        "code": "3624",
        "description": "Carbon and graphite products"
    },
    {
        "code": "3625",
        "description": "Relays and industrial controls"
    },
    {
        "code": "3629",
        "description": "Electrical industrial apparatus"
    },
    {
        "code": "3631",
        "description": "Household cooking equipment"
    },
    {
        "code": "3632",
        "description": "Household refrigerators and freezers"
    },
    {
        "code": "3633",
        "description": "Household laundry equipment"
    },
    {
        "code": "3634",
        "description": "Electric housewares and fans"
    },
    {
        "code": "3635",
        "description": "Household vacuum cleaners"
    },
    {
        "code": "3639",
        "description": "Household appliances, nec"
    },
    {
        "code": "3641",
        "description": "Electric lamps"
    },
    {
        "code": "3643",
        "description": "Current-carrying wiring devices"
    },
    {
        "code": "3644",
        "description": "Noncurrent-carrying wiring devices"
    },
    {
        "code": "3645",
        "description": "Residential lighting fixtures"
    },
    {
        "code": "3646",
        "description": "Commercial lighting fixtures"
    },
    {
        "code": "3647",
        "description": "Vehicular lighting equipment"
    },
    {
        "code": "3648",
        "description": "Lighting equipment, nec"
    },
    {
        "code": "3651",
        "description": "Household audio and video equipment"
    },
    {
        "code": "3652",
        "description": "Prerecorded records and tapes"
    },
    {
        "code": "3661",
        "description": "Telephone and telegraph apparatus"
    },
    {
        "code": "3663",
        "description": "Radio and t.v. communications equipment"
    },
    {
        "code": "3669",
        "description": "Communications equipment, nec"
    },
    {
        "code": "3671",
        "description": "Electron tubes"
    },
    {
        "code": "3672",
        "description": "Printed circuit boards"
    },
    {
        "code": "3674",
        "description": "Semiconductors and related devices"
    },
    {
        "code": "3675",
        "description": "Electronic capacitors"
    },
    {
        "code": "3676",
        "description": "Electronic resistors"
    },
    {
        "code": "3677",
        "description": "Electronic coils and transformers"
    },
    {
        "code": "3678",
        "description": "Electronic connectors"
    },
    {
        "code": "3679",
        "description": "Electronic components, nec"
    },
    {
        "code": "3691",
        "description": "Storage batteries"
    },
    {
        "code": "3692",
        "description": "Primary batteries, dry and wet"
    },
    {
        "code": "3694",
        "description": "Engine electrical equipment"
    },
    {
        "code": "3695",
        "description": "Magnetic and optical recording media"
    },
    {
        "code": "3699",
        "description": "Electrical equipment and supplies, nec"
    },
    {
        "code": "3711",
        "description": "Motor vehicles and car bodies"
    },
    {
        "code": "3713",
        "description": "Truck and bus bodies"
    },
    {
        "code": "3714",
        "description": "Motor vehicle parts and accessories"
    },
    {
        "code": "3715",
        "description": "Truck trailers"
    },
    {
        "code": "3716",
        "description": "Motor homes"
    },
    {
        "code": "3721",
        "description": "Aircraft"
    },
    {
        "code": "3724",
        "description": "Aircraft engines and engine parts"
    },
    {
        "code": "3728",
        "description": "Aircraft parts and equipment, nec"
    },
    {
        "code": "3731",
        "description": "Shipbuilding and repairing"
    },
    {
        "code": "3732",
        "description": "Boatbuilding and repairing"
    },
    {
        "code": "3743",
        "description": "Railroad equipment"
    },
    {
        "code": "3751",
        "description": "Motorcycles, bicycles, and parts"
    },
    {
        "code": "3761",
        "description": "Guided missiles and space vehicles"
    },
    {
        "code": "3764",
        "description": "Space propulsion units and parts"
    },
    {
        "code": "3769",
        "description": "Space vehicle equipment, nec"
    },
    {
        "code": "3792",
        "description": "Travel trailers and campers"
    },
    {
        "code": "3795",
        "description": "Tanks and tank components"
    },
    {
        "code": "3799",
        "description": "Transportation equipment, nec"
    },
    {
        "code": "3812",
        "description": "Search and navigation equipment"
    },
    {
        "code": "3821",
        "description": "Laboratory apparatus and furniture"
    },
    {
        "code": "3822",
        "description": "Environmental controls"
    },
    {
        "code": "3823",
        "description": "Process control instruments"
    },
    {
        "code": "3824",
        "description": "Fluid meters and counting devices"
    },
    {
        "code": "3825",
        "description": "Instruments to measure electricity"
    },
    {
        "code": "3826",
        "description": "Analytical instruments"
    },
    {
        "code": "3827",
        "description": "Optical instruments and lenses"
    },
    {
        "code": "3829",
        "description": "Measuring and controlling devices, nec"
    },
    {
        "code": "3841",
        "description": "Surgical and medical instruments"
    },
    {
        "code": "3842",
        "description": "Surgical appliances and supplies"
    },
    {
        "code": "3843",
        "description": "Dental equipment and supplies"
    },
    {
        "code": "3844",
        "description": "X-ray apparatus and tubes"
    },
    {
        "code": "3845",
        "description": "Electromedical equipment"
    },
    {
        "code": "3851",
        "description": "Ophthalmic goods"
    },
    {
        "code": "3861",
        "description": "Photographic equipment and supplies"
    },
    {
        "code": "3873",
        "description": "Watches, clocks, watchcases, and parts"
    },
    {
        "code": "3911",
        "description": "Jewelry, precious metal"
    },
    {
        "code": "3914",
        "description": "Silverware and plated ware"
    },
    {
        "code": "3915",
        "description": "Jewelers' materials and lapidary work"
    },
    {
        "code": "3931",
        "description": "Musical instruments"
    },
    {
        "code": "3942",
        "description": "Dolls and stuffed toys"
    },
    {
        "code": "3944",
        "description": "Games, toys, and children's vehicles"
    },
    {
        "code": "3949",
        "description": "Sporting and athletic goods, nec"
    },
    {
        "code": "3951",
        "description": "Pens and mechanical pencils"
    },
    {
        "code": "3952",
        "description": "Lead pencils and art goods"
    },
    {
        "code": "3953",
        "description": "Marking devices"
    },
    {
        "code": "3955",
        "description": "Carbon paper and inked ribbons"
    },
    {
        "code": "3961",
        "description": "Costume jewelry"
    },
    {
        "code": "3965",
        "description": "Fasteners, buttons, needles, and pins"
    },
    {
        "code": "3991",
        "description": "Brooms and brushes"
    },
    {
        "code": "3993",
        "description": "Signs and advertising specialties"
    },
    {
        "code": "3995",
        "description": "Burial caskets"
    },
    {
        "code": "3996",
        "description": "Hard surface floor coverings, nec"
    },
    {
        "code": "3999",
        "description": "Manufacturing industries, nec"
    },
    {
        "code": "4011",
        "description": "Railroads, line-haul operating"
    },
    {
        "code": "4013",
        "description": "Switching and terminal services"
    },
    {
        "code": "4111",
        "description": "Local and suburban transit"
    },
    {
        "code": "4119",
        "description": "Local passenger transportation, nec"
    },
    {
        "code": "4121",
        "description": "Taxicabs"
    },
    {
        "code": "4131",
        "description": "Intercity and rural bus transportation"
    },
    {
        "code": "4141",
        "description": "Local bus charter service"
    },
    {
        "code": "4142",
        "description": "Bus charter service, except local"
    },
    {
        "code": "4151",
        "description": "School buses"
    },
    {
        "code": "4173",
        "description": "Bus terminal and service facilities"
    },
    {
        "code": "4212",
        "description": "Local trucking, without storage"
    },
    {
        "code": "4213",
        "description": "Trucking, except local"
    },
    {
        "code": "4214",
        "description": "Local trucking with storage"
    },
    {
        "code": "4215",
        "description": "Courier services, except by air"
    },
    {
        "code": "4221",
        "description": "Farm product warehousing and storage"
    },
    {
        "code": "4222",
        "description": "Refrigerated warehousing and storage"
    },
    {
        "code": "4225",
        "description": "General warehousing and storage"
    },
    {
        "code": "4226",
        "description": "Special warehousing and storage, nec"
    },
    {
        "code": "4231",
        "description": "Trucking terminal facilities"
    },
    {
        "code": "4311",
        "description": "U.S. Postal Service"
    },
    {
        "code": "4412",
        "description": "Deep sea foreign transportation of freight"
    },
    {
        "code": "4424",
        "description": "Deep sea domestic transportation of freight"
    },
    {
        "code": "4432",
        "description": "Freight transportation on the great lakes"
    },
    {
        "code": "4449",
        "description": "Water transportation of freight"
    },
    {
        "code": "4481",
        "description": "Deep sea passenger transportation, except ferry"
    },
    {
        "code": "4482",
        "description": "Ferries"
    },
    {
        "code": "4489",
        "description": "Water passenger transportation"
    },
    {
        "code": "4491",
        "description": "Marine cargo handling"
    },
    {
        "code": "4492",
        "description": "Towing and tugboat service"
    },
    {
        "code": "4493",
        "description": "Marinas"
    },
    {
        "code": "4499",
        "description": "Water transportation services, nec"
    },
    {
        "code": "4512",
        "description": "Air transportation, scheduled"
    },
    {
        "code": "4513",
        "description": "Air courier services"
    },
    {
        "code": "4522",
        "description": "Air transportation, nonscheduled"
    },
    {
        "code": "4581",
        "description": "Airports, flying fields, and services"
    },
    {
        "code": "4612",
        "description": "Crude petroleum pipelines"
    },
    {
        "code": "4613",
        "description": "Refined petroleum pipelines"
    },
    {
        "code": "4619",
        "description": "Pipelines, nec"
    },
    {
        "code": "4724",
        "description": "Travel agencies"
    },
    {
        "code": "4725",
        "description": "Tour operators"
    },
    {
        "code": "4729",
        "description": "Passenger transportation arrangement"
    },
    {
        "code": "4731",
        "description": "Freight transportation arrangement"
    },
    {
        "code": "4741",
        "description": "Rental of railroad cars"
    },
    {
        "code": "4783",
        "description": "Packing and crating"
    },
    {
        "code": "4785",
        "description": "Inspection and fixed facilities"
    },
    {
        "code": "4789",
        "description": "Transportation services, nec"
    },
    {
        "code": "4812",
        "description": "Radiotelephone communication"
    },
    {
        "code": "4813",
        "description": "Telephone communication, except radio"
    },
    {
        "code": "4822",
        "description": "Telegraph and other communications"
    },
    {
        "code": "4832",
        "description": "Radio broadcasting stations"
    },
    {
        "code": "4833",
        "description": "Television broadcasting stations"
    },
    {
        "code": "4841",
        "description": "Cable and other pay television services"
    },
    {
        "code": "4899",
        "description": "Communication services, nec"
    },
    {
        "code": "4911",
        "description": "Electric services"
    },
    {
        "code": "4922",
        "description": "Natural gas transmission"
    },
    {
        "code": "4923",
        "description": "Gas transmission and distribution"
    },
    {
        "code": "4924",
        "description": "Natural gas distribution"
    },
    {
        "code": "4925",
        "description": "Gas production and/or distribution"
    },
    {
        "code": "4931",
        "description": "Electric and other services combined"
    },
    {
        "code": "4932",
        "description": "Gas and other services combined"
    },
    {
        "code": "4939",
        "description": "Combination utilities, nec"
    },
    {
        "code": "4941",
        "description": "Water supply"
    },
    {
        "code": "4952",
        "description": "Sewerage systems"
    },
    {
        "code": "4953",
        "description": "Refuse systems"
    },
    {
        "code": "4959",
        "description": "Sanitary services, nec"
    },
    {
        "code": "4961",
        "description": "Steam and air-conditioning supply"
    },
    {
        "code": "4971",
        "description": "Irrigation systems"
    },
    {
        "code": "5012",
        "description": "Automobiles and other motor vehicles"
    },
    {
        "code": "5013",
        "description": "Motor vehicle supplies and new parts"
    },
    {
        "code": "5014",
        "description": "Tires and tubes"
    },
    {
        "code": "5015",
        "description": "Motor vehicle parts, used"
    },
    {
        "code": "5021",
        "description": "Furniture"
    },
    {
        "code": "5023",
        "description": "Homefurnishings"
    },
    {
        "code": "5031",
        "description": "Lumber, plywood, and millwork"
    },
    {
        "code": "5032",
        "description": "Brick, stone, and related material"
    },
    {
        "code": "5033",
        "description": "Roofing, siding, and insulation"
    },
    {
        "code": "5039",
        "description": "Construction materials, nec"
    },
    {
        "code": "5043",
        "description": "Photographic equipment and supplies"
    },
    {
        "code": "5044",
        "description": "Office equipment"
    },
    {
        "code": "5045",
        "description": "Computers, peripherals, and software"
    },
    {
        "code": "5046",
        "description": "Commercial equipment, nec"
    },
    {
        "code": "5047",
        "description": "Medical and hospital equipment"
    },
    {
        "code": "5048",
        "description": "Ophthalmic goods"
    },
    {
        "code": "5049",
        "description": "Professional equipment, nec"
    },
    {
        "code": "5051",
        "description": "Metals service centers and offices"
    },
    {
        "code": "5052",
        "description": "Coal and other minerals and ores"
    },
    {
        "code": "5063",
        "description": "Electrical apparatus and equipment"
    },
    {
        "code": "5064",
        "description": "Electrical appliances, television and radio"
    },
    {
        "code": "5065",
        "description": "Electronic parts and equipment, nec"
    },
    {
        "code": "5072",
        "description": "Hardware"
    },
    {
        "code": "5074",
        "description": "Plumbing and hydronic heating supplies"
    },
    {
        "code": "5075",
        "description": "Warm air heating and air conditioning"
    },
    {
        "code": "5078",
        "description": "Refrigeration equipment and supplies"
    },
    {
        "code": "5082",
        "description": "Construction and mining machinery"
    },
    {
        "code": "5083",
        "description": "Farm and garden machinery"
    },
    {
        "code": "5084",
        "description": "Industrial machinery and equipment"
    },
    {
        "code": "5085",
        "description": "Industrial supplies"
    },
    {
        "code": "5087",
        "description": "Service establishment equipment"
    },
    {
        "code": "5088",
        "description": "Transportation equipment and supplies"
    },
    {
        "code": "5091",
        "description": "Sporting and recreation goods"
    },
    {
        "code": "5092",
        "description": "Toys and hobby goods and supplies"
    },
    {
        "code": "5093",
        "description": "Scrap and waste materials"
    },
    {
        "code": "5094",
        "description": "Jewelry and precious stones"
    },
    {
        "code": "5099",
        "description": "Durable goods, nec"
    },
    {
        "code": "5111",
        "description": "Printing and writing paper"
    },
    {
        "code": "5112",
        "description": "Stationery and office supplies"
    },
    {
        "code": "5113",
        "description": "Industrial and personal service paper"
    },
    {
        "code": "5122",
        "description": "Drugs, proprietaries, and sundries"
    },
    {
        "code": "5131",
        "description": "Piece goods and notions"
    },
    {
        "code": "5136",
        "description": "Men's and boy's clothing"
    },
    {
        "code": "5137",
        "description": "Women's and children's clothing"
    },
    {
        "code": "5139",
        "description": "Footwear"
    },
    {
        "code": "5141",
        "description": "Groceries, general line"
    },
    {
        "code": "5142",
        "description": "Packaged frozen goods"
    },
    {
        "code": "5143",
        "description": "Dairy products, except dried or canned"
    },
    {
        "code": "5144",
        "description": "Poultry and poultry products"
    },
    {
        "code": "5145",
        "description": "Confectionery"
    },
    {
        "code": "5146",
        "description": "Fish and seafoods"
    },
    {
        "code": "5147",
        "description": "Meats and meat products"
    },
    {
        "code": "5148",
        "description": "Fresh fruits and vegetables"
    },
    {
        "code": "5149",
        "description": "Groceries and related products, nec"
    },
    {
        "code": "5153",
        "description": "Grain and field beans"
    },
    {
        "code": "5154",
        "description": "Livestock"
    },
    {
        "code": "5159",
        "description": "Farm-product raw materials, nec"
    },
    {
        "code": "5162",
        "description": "Plastics materials and basic shapes"
    },
    {
        "code": "5169",
        "description": "Chemicals and allied products, nec"
    },
    {
        "code": "5171",
        "description": "Petroleum bulk stations and terminals"
    },
    {
        "code": "5172",
        "description": "Petroleum products, nec"
    },
    {
        "code": "5181",
        "description": "Beer and ale"
    },
    {
        "code": "5182",
        "description": "Wine and distilled beverages"
    },
    {
        "code": "5191",
        "description": "Farm supplies"
    },
    {
        "code": "5192",
        "description": "Books, periodicals, and newspapers"
    },
    {
        "code": "5193",
        "description": "Flowers and florists supplies"
    },
    {
        "code": "5194",
        "description": "Tobacco and tobacco products"
    },
    {
        "code": "5198",
        "description": "Paints, varnishes, and supplies"
    },
    {
        "code": "5199",
        "description": "Nondurable goods, nec"
    },
    {
        "code": "5211",
        "description": "Lumber and other building materials"
    },
    {
        "code": "5231",
        "description": "Paint, glass, and wallpaper stores"
    },
    {
        "code": "5251",
        "description": "Hardware stores"
    },
    {
        "code": "5261",
        "description": "Retail nurseries and garden stores"
    },
    {
        "code": "5271",
        "description": "Mobile home dealers"
    },
    {
        "code": "5311",
        "description": "Department stores"
    },
    {
        "code": "5331",
        "description": "Variety stores"
    },
    {
        "code": "5399",
        "description": "Miscellaneous general merchandise"
    },
    {
        "code": "5411",
        "description": "Grocery stores"
    },
    {
        "code": "5421",
        "description": "Meat and fish markets"
    },
    {
        "code": "5431",
        "description": "Fruit and vegetable markets"
    },
    {
        "code": "5441",
        "description": "Candy, nut, and confectionery stores"
    },
    {
        "code": "5451",
        "description": "Dairy products stores"
    },
    {
        "code": "5461",
        "description": "Retail bakeries"
    },
    {
        "code": "5499",
        "description": "Miscellaneous food stores"
    },
    {
        "code": "5511",
        "description": "New and used car dealers"
    },
    {
        "code": "5521",
        "description": "Used car dealers"
    },
    {
        "code": "5531",
        "description": "Auto and home supply stores"
    },
    {
        "code": "5541",
        "description": "Gasoline service stations"
    },
    {
        "code": "5551",
        "description": "Boat dealers"
    },
    {
        "code": "5561",
        "description": "Recreational vehicle dealers"
    },
    {
        "code": "5571",
        "description": "Motorcycle dealers"
    },
    {
        "code": "5599",
        "description": "Automotive dealers, nec"
    },
    {
        "code": "5611",
        "description": "Men's and boys' clothing stores"
    },
    {
        "code": "5621",
        "description": "Women's clothing stores"
    },
    {
        "code": "5632",
        "description": "Women's accessory and specialty stores"
    },
    {
        "code": "5641",
        "description": "Children's and infants' wear stores"
    },
    {
        "code": "5651",
        "description": "Family clothing stores"
    },
    {
        "code": "5661",
        "description": "Shoe stores"
    },
    {
        "code": "5699",
        "description": "Miscellaneous apparel and accessories"
    },
    {
        "code": "5712",
        "description": "Furniture stores"
    },
    {
        "code": "5713",
        "description": "Floor covering stores"
    },
    {
        "code": "5714",
        "description": "Drapery and upholstery stores"
    },
    {
        "code": "5719",
        "description": "Miscellaneous homefurnishings"
    },
    {
        "code": "5722",
        "description": "Household appliance stores"
    },
    {
        "code": "5731",
        "description": "Radio, television, and electronic stores"
    },
    {
        "code": "5734",
        "description": "Computer and software stores"
    },
    {
        "code": "5735",
        "description": "Record and prerecorded tape stores"
    },
    {
        "code": "5736",
        "description": "Musical instrument stores"
    },
    {
        "code": "5812",
        "description": "Eating places"
    },
    {
        "code": "5813",
        "description": "Drinking places"
    },
    {
        "code": "5912",
        "description": "Drug stores and proprietary stores"
    },
    {
        "code": "5921",
        "description": "Liquor stores"
    },
    {
        "code": "5932",
        "description": "Used merchandise stores"
    },
    {
        "code": "5941",
        "description": "Sporting goods and bicycle shops"
    },
    {
        "code": "5942",
        "description": "Book stores"
    },
    {
        "code": "5943",
        "description": "Stationery stores"
    },
    {
        "code": "5944",
        "description": "Jewelry stores"
    },
    {
        "code": "5945",
        "description": "Hobby, toy, and game shops"
    },
    {
        "code": "5946",
        "description": "Camera and photographic supply stores"
    },
    {
        "code": "5947",
        "description": "Gift, novelty, and souvenir shop"
    },
    {
        "code": "5948",
        "description": "Luggage and leather goods stores"
    },
    {
        "code": "5949",
        "description": "Sewing, needlework, and piece goods"
    },
    {
        "code": "5961",
        "description": "Catalog and mail-order houses"
    },
    {
        "code": "5962",
        "description": "Merchandising machine operators"
    },
    {
        "code": "5963",
        "description": "Direct selling establishments"
    },
    {
        "code": "5983",
        "description": "Fuel oil dealers"
    },
    {
        "code": "5984",
        "description": "Liquefied petroleum gas dealers"
    },
    {
        "code": "5989",
        "description": "Fuel dealers, nec"
    },
    {
        "code": "5992",
        "description": "Florists"
    },
    {
        "code": "5993",
        "description": "Tobacco stores and stands"
    },
    {
        "code": "5994",
        "description": "News dealers and newsstands"
    },
    {
        "code": "5995",
        "description": "Optical goods stores"
    },
    {
        "code": "5999",
        "description": "Miscellaneous retail stores, nec"
    },
    {
        "code": "6011",
        "description": "Federal reserve banks"
    },
    {
        "code": "6019",
        "description": "Central reserve depository, nec"
    },
    {
        "code": "6021",
        "description": "National commercial banks"
    },
    {
        "code": "6022",
        "description": "State commercial banks"
    },
    {
        "code": "6029",
        "description": "Commercial banks, nec"
    },
    {
        "code": "6035",
        "description": "Federal savings institutions"
    },
    {
        "code": "6036",
        "description": "Savings institutions, except federal"
    },
    {
        "code": "6061",
        "description": "Federal credit unions"
    },
    {
        "code": "6062",
        "description": "State credit unions"
    },
    {
        "code": "6081",
        "description": "Foreign bank and branches and agencies"
    },
    {
        "code": "6082",
        "description": "Foreign trade and international banks"
    },
    {
        "code": "6091",
        "description": "Nondeposit trust facilities"
    },
    {
        "code": "6099",
        "description": "Functions related to depository banking"
    },
    {
        "code": "6111",
        "description": "Federal and federally sponsored credit"
    },
    {
        "code": "6141",
        "description": "Personal credit institutions"
    },
    {
        "code": "6153",
        "description": "Short-term business credit"
    },
    {
        "code": "6159",
        "description": "Miscellaneous business credit"
    },
    {
        "code": "6162",
        "description": "Mortgage bankers and correspondents"
    },
    {
        "code": "6163",
        "description": "Loan brokers"
    },
    {
        "code": "6211",
        "description": "Security brokers and dealers"
    },
    {
        "code": "6221",
        "description": "Commodity contracts brokers, dealers"
    },
    {
        "code": "6231",
        "description": "Security and commodity exchanges"
    },
    {
        "code": "6282",
        "description": "Investment advice"
    },
    {
        "code": "6289",
        "description": "Security and commodity service"
    },
    {
        "code": "6311",
        "description": "Life insurance"
    },
    {
        "code": "6321",
        "description": "Accident and health insurance"
    },
    {
        "code": "6324",
        "description": "Hospital and medical service plans"
    },
    {
        "code": "6331",
        "description": "Fire, marine, and casualty insurance"
    },
    {
        "code": "6351",
        "description": "Surety insurance"
    },
    {
        "code": "6361",
        "description": "Title insurance"
    },
    {
        "code": "6371",
        "description": "Pension, health, and welfare funds"
    },
    {
        "code": "6399",
        "description": "Insurance carriers, nec"
    },
    {
        "code": "6411",
        "description": "Insurance agents, brokers, and service"
    },
    {
        "code": "6512",
        "description": "Nonresidential building operators"
    },
    {
        "code": "6513",
        "description": "Apartment building operators"
    },
    {
        "code": "6514",
        "description": "Dwelling operators, except apartments"
    },
    {
        "code": "6515",
        "description": "Mobile home site operators"
    },
    {
        "code": "6517",
        "description": "Railroad property lessors"
    },
    {
        "code": "6519",
        "description": "Real property lessors, nec"
    },
    {
        "code": "6531",
        "description": "Real estate agents and managers"
    },
    {
        "code": "6541",
        "description": "Title abstract offices"
    },
    {
        "code": "6552",
        "description": "Subdividers and developers, nec"
    },
    {
        "code": "6553",
        "description": "Cemetery subdividers and developers"
    },
    {
        "code": "6712",
        "description": "Bank holding companies"
    },
    {
        "code": "6719",
        "description": "Holding companies, nec"
    },
    {
        "code": "6722",
        "description": "Management investment, open-ended"
    },
    {
        "code": "6726",
        "description": "Investment offices, nec"
    },
    {
        "code": "6732",
        "description": "Trusts: educational, religious, etc."
    },
    {
        "code": "6733",
        "description": "Trusts, nec"
    },
    {
        "code": "6792",
        "description": "Oil royalty traders"
    },
    {
        "code": "6794",
        "description": "Patent owners and lessors"
    },
    {
        "code": "6798",
        "description": "Real estate investment trusts"
    },
    {
        "code": "6799",
        "description": "Investors, nec"
    },
    {
        "code": "7011",
        "description": "Hotels and motels"
    },
    {
        "code": "7021",
        "description": "Rooming and boarding houses"
    },
    {
        "code": "7032",
        "description": "Sporting and recreational camps"
    },
    {
        "code": "7033",
        "description": "Trailer parks and campsites"
    },
    {
        "code": "7041",
        "description": "Membership-basis organization hotels"
    },
    {
        "code": "7211",
        "description": "Power laundries, family and commercial"
    },
    {
        "code": "7212",
        "description": "Garment pressing and cleaners' agents"
    },
    {
        "code": "7213",
        "description": "Linen supply"
    },
    {
        "code": "7215",
        "description": "Coin-operated laundries and cleaning"
    },
    {
        "code": "7216",
        "description": "Drycleaning plants, except rugs"
    },
    {
        "code": "7217",
        "description": "Carpet and upholstery cleaning"
    },
    {
        "code": "7218",
        "description": "Industrial launderers"
    },
    {
        "code": "7219",
        "description": "Laundry and garment services, nec"
    },
    {
        "code": "7221",
        "description": "Photographic studios, portrait"
    },
    {
        "code": "7231",
        "description": "Beauty shops"
    },
    {
        "code": "7241",
        "description": "Barber shops"
    },
    {
        "code": "7251",
        "description": "Shoe repair and shoeshine parlors"
    },
    {
        "code": "7261",
        "description": "Funeral service and crematories"
    },
    {
        "code": "7291",
        "description": "Tax return preparation services"
    },
    {
        "code": "7299",
        "description": "Miscellaneous personal services"
    },
    {
        "code": "7311",
        "description": "Advertising agencies"
    },
    {
        "code": "7312",
        "description": "Outdoor advertising services"
    },
    {
        "code": "7313",
        "description": "Radio, television, publisher representatives"
    },
    {
        "code": "7319",
        "description": "Advertising, nec"
    },
    {
        "code": "7322",
        "description": "Adjustment and collection services"
    },
    {
        "code": "7323",
        "description": "Credit reporting services"
    },
    {
        "code": "7331",
        "description": "Direct mail advertising services"
    },
    {
        "code": "7334",
        "description": "Photocopying and duplicating services"
    },
    {
        "code": "7335",
        "description": "Commercial photography"
    },
    {
        "code": "7336",
        "description": "Commercial art and graphic design"
    },
    {
        "code": "7338",
        "description": "Secretarial and court reporting"
    },
    {
        "code": "7342",
        "description": "Disinfecting and pest control services"
    },
    {
        "code": "7349",
        "description": "Building maintenance services, nec"
    },
    {
        "code": "7352",
        "description": "Medical equipment rental"
    },
    {
        "code": "7353",
        "description": "Heavy construction equipment rental"
    },
    {
        "code": "7359",
        "description": "Equipment rental and leasing, nec"
    },
    {
        "code": "7361",
        "description": "Employment agencies"
    },
    {
        "code": "7363",
        "description": "Help supply services"
    },
    {
        "code": "7371",
        "description": "Custom computer programming services"
    },
    {
        "code": "7372",
        "description": "Prepackaged software"
    },
    {
        "code": "7373",
        "description": "Computer integrated systems design"
    },
    {
        "code": "7374",
        "description": "Data processing and preparation"
    },
    {
        "code": "7375",
        "description": "Information retrieval services"
    },
    {
        "code": "7376",
        "description": "Computer facilities management"
    },
    {
        "code": "7377",
        "description": "Computer rental and leasing"
    },
    {
        "code": "7378",
        "description": "Computer maintenance and repair"
    },
    {
        "code": "7379",
        "description": "Computer related services, nec"
    },
    {
        "code": "7381",
        "description": "Detective and armored car services"
    },
    {
        "code": "7382",
        "description": "Security systems services"
    },
    {
        "code": "7383",
        "description": "News syndicates"
    },
    {
        "code": "7384",
        "description": "Photofinish laboratories"
    },
    {
        "code": "7389",
        "description": "Business services, nec"
    },
    {
        "code": "7513",
        "description": "Truck rental and leasing, without drivers"
    },
    {
        "code": "7514",
        "description": "Passenger car rental"
    },
    {
        "code": "7515",
        "description": "Passenger car leasing"
    },
    {
        "code": "7519",
        "description": "Utility trailer rental"
    },
    {
        "code": "7521",
        "description": "Automobile parking"
    },
    {
        "code": "7532",
        "description": "Top and body repair and paint shops"
    },
    {
        "code": "7533",
        "description": "Auto exhaust system repair shops"
    },
    {
        "code": "7534",
        "description": "Tire retreading and repair shops"
    },
    {
        "code": "7536",
        "description": "Automotive glass replacement shops"
    },
    {
        "code": "7537",
        "description": "Automotive transmission repair shops"
    },
    {
        "code": "7538",
        "description": "General automotive repair shops"
    },
    {
        "code": "7539",
        "description": "Automotive repair shops, nec"
    },
    {
        "code": "7542",
        "description": "Carwashes"
    },
    {
        "code": "7549",
        "description": "Automotive services, nec"
    },
    {
        "code": "7622",
        "description": "Radio and television repair"
    },
    {
        "code": "7623",
        "description": "Refrigeration service and repair"
    },
    {
        "code": "7629",
        "description": "Electrical repair shops"
    },
    {
        "code": "7631",
        "description": "Watch, clock, and jewelry repair"
    },
    {
        "code": "7641",
        "description": "Reupholstery and furniture repair"
    },
    {
        "code": "7692",
        "description": "Welding repair"
    },
    {
        "code": "7694",
        "description": "Armature rewinding shops"
    },
    {
        "code": "7699",
        "description": "Repair services, nec"
    },
    {
        "code": "7812",
        "description": "Motion picture and video production"
    },
    {
        "code": "7819",
        "description": "Services allied to motion pictures"
    },
    {
        "code": "7822",
        "description": "Motion picture and tape distribution"
    },
    {
        "code": "7829",
        "description": "Motion picture distribution services"
    },
    {
        "code": "7832",
        "description": "Motion picture theaters, except drive-in"
    },
    {
        "code": "7833",
        "description": "Drive-in motion picture theaters"
    },
    {
        "code": "7841",
        "description": "Video tape rental"
    },
    {
        "code": "7911",
        "description": "Dance studios, schools, and halls"
    },
    {
        "code": "7922",
        "description": "Theatrical producers and services"
    },
    {
        "code": "7929",
        "description": "Entertainers and entertainment groups"
    },
    {
        "code": "7933",
        "description": "Bowling centers"
    },
    {
        "code": "7941",
        "description": "Sports clubs, managers, and promoters"
    },
    {
        "code": "7948",
        "description": "Racing, including track operation"
    },
    {
        "code": "7991",
        "description": "Physical fitness facilities"
    },
    {
        "code": "7992",
        "description": "Public golf courses"
    },
    {
        "code": "7993",
        "description": "Coin-operated amusement devices"
    },
    {
        "code": "7996",
        "description": "Amusement parks"
    },
    {
        "code": "7997",
        "description": "Membership sports and recreation clubs"
    },
    {
        "code": "7999",
        "description": "Amusement and recreation, nec"
    },
    {
        "code": "8011",
        "description": "Offices and clinics of medical doctors"
    },
    {
        "code": "8021",
        "description": "Offices and clinics of dentists"
    },
    {
        "code": "8031",
        "description": "Offices and clinics of osteopathic physicians"
    },
    {
        "code": "8041",
        "description": "Offices and clinics of chiropractors"
    },
    {
        "code": "8042",
        "description": "Offices and clinics of optometrists"
    },
    {
        "code": "8043",
        "description": "Offices and clinics of podiatrists"
    },
    {
        "code": "8049",
        "description": "Offices of health practitioner"
    },
    {
        "code": "8051",
        "description": "Skilled nursing care facilities"
    },
    {
        "code": "8052",
        "description": "Intermediate care facilities"
    },
    {
        "code": "8059",
        "description": "Nursing and personal care, nec"
    },
    {
        "code": "8062",
        "description": "General medical and surgical hospitals"
    },
    {
        "code": "8063",
        "description": "Psychiatric hospitals"
    },
    {
        "code": "8069",
        "description": "Specialty hospitals, except psychiatric"
    },
    {
        "code": "8071",
        "description": "Medical laboratories"
    },
    {
        "code": "8072",
        "description": "Dental laboratories"
    },
    {
        "code": "8082",
        "description": "Home health care services"
    },
    {
        "code": "8092",
        "description": "Kidney dialysis centers"
    },
    {
        "code": "8093",
        "description": "Specialty outpatient clinics, nec"
    },
    {
        "code": "8099",
        "description": "Health and allied services, nec"
    },
    {
        "code": "8111",
        "description": "Legal services"
    },
    {
        "code": "8211",
        "description": "Elementary and secondary schools"
    },
    {
        "code": "8221",
        "description": "Colleges and universities"
    },
    {
        "code": "8222",
        "description": "Junior colleges"
    },
    {
        "code": "8231",
        "description": "Libraries"
    },
    {
        "code": "8243",
        "description": "Data processing schools"
    },
    {
        "code": "8244",
        "description": "Business and secretarial schools"
    },
    {
        "code": "8249",
        "description": "Vocational schools, nec"
    },
    {
        "code": "8299",
        "description": "Schools and educational services"
    },
    {
        "code": "8322",
        "description": "Individual and family services"
    },
    {
        "code": "8331",
        "description": "Job training and related services"
    },
    {
        "code": "8351",
        "description": "Child day care services"
    },
    {
        "code": "8361",
        "description": "Residential care"
    },
    {
        "code": "8399",
        "description": "Social services, nec"
    },
    {
        "code": "8412",
        "description": "Museums and art galleries"
    },
    {
        "code": "8422",
        "description": "Botanical and zoological gardens"
    },
    {
        "code": "8611",
        "description": "Business associations"
    },
    {
        "code": "8621",
        "description": "Professional organizations"
    },
    {
        "code": "8631",
        "description": "Labor organizations"
    },
    {
        "code": "8641",
        "description": "Civic and social associations"
    },
    {
        "code": "8651",
        "description": "Political organizations"
    },
    {
        "code": "8661",
        "description": "Religious organizations"
    },
    {
        "code": "8699",
        "description": "Membership organizations, nec"
    },
    {
        "code": "8711",
        "description": "Engineering services"
    },
    {
        "code": "8712",
        "description": "Architectural services"
    },
    {
        "code": "8713",
        "description": "Surveying services"
    },
    {
        "code": "8721",
        "description": "Accounting, auditing, and bookkeeping"
    },
    {
        "code": "8731",
        "description": "Commercial physical research"
    },
    {
        "code": "8732",
        "description": "Commercial nonphysical research"
    },
    {
        "code": "8733",
        "description": "Noncommercial research organizations"
    },
    {
        "code": "8734",
        "description": "Testing laboratories"
    },
    {
        "code": "8741",
        "description": "Management services"
    },
    {
        "code": "8742",
        "description": "Management consulting services"
    },
    {
        "code": "8743",
        "description": "Public relations services"
    },
    {
        "code": "8744",
        "description": "Facilities support services"
    },
    {
        "code": "8748",
        "description": "Business consulting, nec"
    },
    {
        "code": "8811",
        "description": "Private households"
    },
    {
        "code": "8999",
        "description": "Services, nec"
    },
    {
        "code": "9111",
        "description": "Executive offices"
    },
    {
        "code": "9121",
        "description": "Legislative bodies"
    },
    {
        "code": "9131",
        "description": "Executive and legislative combined"
    },
    {
        "code": "9199",
        "description": "General government, nec"
    },
    {
        "code": "9211",
        "description": "Courts"
    },
    {
        "code": "9221",
        "description": "Police protection"
    },
    {
        "code": "9222",
        "description": "Legal counsel and prosecution"
    },
    {
        "code": "9223",
        "description": "Correctional institutions"
    },
    {
        "code": "9224",
        "description": "Fire protection"
    },
    {
        "code": "9229",
        "description": "Public order and safety, nec"
    },
    {
        "code": "9311",
        "description": "Finance, taxation, and monetary policy"
    },
    {
        "code": "9411",
        "description": "Administration of educational programs"
    },
    {
        "code": "9431",
        "description": "Administration of public health programs"
    },
    {
        "code": "9441",
        "description": "Administration of social and manpower programs"
    },
    {
        "code": "9451",
        "description": "Administration of veterans' affairs"
    },
    {
        "code": "9511",
        "description": "Air, water, and solid waste management"
    },
    {
        "code": "9512",
        "description": "Land, mineral, and wildlife conservation"
    },
    {
        "code": "9531",
        "description": "Housing programs"
    },
    {
        "code": "9532",
        "description": "Urban and community development"
    },
    {
        "code": "9611",
        "description": "Administration of general economic programs"
    },
    {
        "code": "9621",
        "description": "Regulation, administration of transportation"
    },
    {
        "code": "9631",
        "description": "Regulation, administration of utilities"
    },
    {
        "code": "9641",
        "description": "Regulation of agricultural marketing"
    },
    {
        "code": "9651",
        "description": "Regulation, miscellaneous commercial sectors"
    },
    {
        "code": "9661",
        "description": "Space research and technology"
    },
    {
        "code": "9711",
        "description": "National security"
    },
    {
        "code": "9721",
        "description": "International affairs"
    },
    {
        "code": "9999",
        "description": "Nonclassifiable establishments"
    }
].sort();

_.each(sics, function(sic){
    sic["type"] = "SIC";
});

var naics = [
    {
        "code": "339116",
        "description": "Dental Laboratories"
    },
    {
        "code": "11",
        "description": "Agriculture, Forestry, Fishing and Hunting"
    },
    {
        "code": "111",
        "description": "Crop Production"
    },
    {
        "code": "1111",
        "description": "Oilseed and Grain Farming"
    },
    {
        "code": "11111",
        "description": "Soybean Farming"
    },
    {
        "code": "111110",
        "description": "Soybean Farming"
    },
    {
        "code": "11112",
        "description": "Oilseed (except Soybean) Farming"
    },
    {
        "code": "111120",
        "description": "Oilseed (except Soybean) Farming"
    },
    {
        "code": "11113",
        "description": "Dry Pea and Bean Farming"
    },
    {
        "code": "111130",
        "description": "Dry Pea and Bean Farming"
    },
    {
        "code": "11114",
        "description": "Wheat Farming"
    },
    {
        "code": "111140",
        "description": "Wheat Farming"
    },
    {
        "code": "11115",
        "description": "Corn Farming"
    },
    {
        "code": "111150",
        "description": "Corn Farming"
    },
    {
        "code": "11116",
        "description": "Rice Farming"
    },
    {
        "code": "111160",
        "description": "Rice Farming"
    },
    {
        "code": "11119",
        "description": "Other Grain Farming"
    },
    {
        "code": "111191",
        "description": "Oilseed and Grain Combination Farming"
    },
    {
        "code": "111199",
        "description": "All Other Grain Farming"
    },
    {
        "code": "1112",
        "description": "Vegetable and Melon Farming"
    },
    {
        "code": "11121",
        "description": "Vegetable and Melon Farming"
    },
    {
        "code": "111211",
        "description": "Potato Farming"
    },
    {
        "code": "111219",
        "description": "Other Vegetable (except Potato) and Melon Farming"
    },
    {
        "code": "1113",
        "description": "Fruit and Tree Nut Farming"
    },
    {
        "code": "11131",
        "description": "Orange Groves"
    },
    {
        "code": "111310",
        "description": "Orange Groves"
    },
    {
        "code": "11132",
        "description": "Citrus (except Orange) Groves"
    },
    {
        "code": "111320",
        "description": "Citrus (except Orange) Groves"
    },
    {
        "code": "11133",
        "description": "Noncitrus Fruit and Tree Nut Farming"
    },
    {
        "code": "111331",
        "description": "Apple Orchards"
    },
    {
        "code": "111332",
        "description": "Grape Vineyards"
    },
    {
        "code": "111333",
        "description": "Strawberry Farming"
    },
    {
        "code": "111334",
        "description": "Berry (except Strawberry) Farming"
    },
    {
        "code": "111335",
        "description": "Tree Nut Farming"
    },
    {
        "code": "111336",
        "description": "Fruit and Tree Nut Combination Farming"
    },
    {
        "code": "111339",
        "description": "Other Noncitrus Fruit Farming"
    },
    {
        "code": "1114",
        "description": "Greenhouse, Nursery, and Floriculture Production"
    },
    {
        "code": "11141",
        "description": "Food Crops Grown Under Cover"
    },
    {
        "code": "111411",
        "description": "Mushroom Production"
    },
    {
        "code": "111419",
        "description": "Other Food Crops Grown Under Cover"
    },
    {
        "code": "11142",
        "description": "Nursery and Floriculture Production"
    },
    {
        "code": "111421",
        "description": "Nursery and Tree Production"
    },
    {
        "code": "111422",
        "description": "Floriculture Production"
    },
    {
        "code": "1119",
        "description": "Other Crop Farming"
    },
    {
        "code": "11191",
        "description": "Tobacco Farming"
    },
    {
        "code": "111910",
        "description": "Tobacco Farming"
    },
    {
        "code": "11192",
        "description": "Cotton Farming"
    },
    {
        "code": "111920",
        "description": "Cotton Farming"
    },
    {
        "code": "11193",
        "description": "Sugarcane Farming"
    },
    {
        "code": "111930",
        "description": "Sugarcane Farming"
    },
    {
        "code": "11194",
        "description": "Hay Farming"
    },
    {
        "code": "111940",
        "description": "Hay Farming"
    },
    {
        "code": "11199",
        "description": "All Other Crop Farming"
    },
    {
        "code": "111991",
        "description": "Sugar Beet Farming"
    },
    {
        "code": "111992",
        "description": "Peanut Farming"
    },
    {
        "code": "111998",
        "description": "All Other Miscellaneous Crop Farming"
    },
    {
        "code": "112",
        "description": "Animal Production and Aquaculture"
    },
    {
        "code": "1121",
        "description": "Cattle Ranching and Farming"
    },
    {
        "code": "11211",
        "description": "Beef Cattle Ranching and Farming, including Feedlots"
    },
    {
        "code": "112111",
        "description": "Beef Cattle Ranching and Farming"
    },
    {
        "code": "112112",
        "description": "Cattle Feedlots"
    },
    {
        "code": "11212",
        "description": "Dairy Cattle and Milk Production"
    },
    {
        "code": "112120",
        "description": "Dairy Cattle and Milk Production"
    },
    {
        "code": "11213",
        "description": "Dual-Purpose Cattle Ranching and Farming"
    },
    {
        "code": "112130",
        "description": "Dual-Purpose Cattle Ranching and Farming"
    },
    {
        "code": "1122",
        "description": "Hog and Pig Farming"
    },
    {
        "code": "11221",
        "description": "Hog and Pig Farming"
    },
    {
        "code": "112210",
        "description": "Hog and Pig Farming"
    },
    {
        "code": "1123",
        "description": "Poultry and Egg Production"
    },
    {
        "code": "11231",
        "description": "Chicken Egg Production"
    },
    {
        "code": "112310",
        "description": "Chicken Egg Production"
    },
    {
        "code": "11232",
        "description": "Broilers and Other Meat Type Chicken Production"
    },
    {
        "code": "112320",
        "description": "Broilers and Other Meat Type Chicken Production"
    },
    {
        "code": "11233",
        "description": "Turkey Production"
    },
    {
        "code": "112330",
        "description": "Turkey Production"
    },
    {
        "code": "11234",
        "description": "Poultry Hatcheries"
    },
    {
        "code": "112340",
        "description": "Poultry Hatcheries"
    },
    {
        "code": "11239",
        "description": "Other Poultry Production"
    },
    {
        "code": "112390",
        "description": "Other Poultry Production"
    },
    {
        "code": "1124",
        "description": "Sheep and Goat Farming"
    },
    {
        "code": "11241",
        "description": "Sheep Farming"
    },
    {
        "code": "112410",
        "description": "Sheep Farming"
    },
    {
        "code": "11242",
        "description": "Goat Farming"
    },
    {
        "code": "112420",
        "description": "Goat Farming"
    },
    {
        "code": "1125",
        "description": "Aquaculture"
    },
    {
        "code": "11251",
        "description": "Aquaculture"
    },
    {
        "code": "112511",
        "description": "Finfish Farming and Fish Hatcheries"
    },
    {
        "code": "112512",
        "description": "Shellfish Farming"
    },
    {
        "code": "112519",
        "description": "Other Aquaculture"
    },
    {
        "code": "1129",
        "description": "Other Animal Production"
    },
    {
        "code": "11291",
        "description": "Apiculture"
    },
    {
        "code": "112910",
        "description": "Apiculture"
    },
    {
        "code": "11292",
        "description": "Horses and Other Equine Production"
    },
    {
        "code": "112920",
        "description": "Horses and Other Equine Production"
    },
    {
        "code": "11293",
        "description": "Fur-Bearing Animal and Rabbit Production"
    },
    {
        "code": "112930",
        "description": "Fur-Bearing Animal and Rabbit Production"
    },
    {
        "code": "11299",
        "description": "All Other Animal Production"
    },
    {
        "code": "112990",
        "description": "All Other Animal Production"
    },
    {
        "code": "113",
        "description": "Forestry and Logging"
    },
    {
        "code": "1131",
        "description": "Timber Tract Operations"
    },
    {
        "code": "11311",
        "description": "Timber Tract Operations"
    },
    {
        "code": "113110",
        "description": "Timber Tract Operations"
    },
    {
        "code": "1132",
        "description": "Forest Nurseries and Gathering of Forest Products"
    },
    {
        "code": "11321",
        "description": "Forest Nurseries and Gathering of Forest Products"
    },
    {
        "code": "113210",
        "description": "Forest Nurseries and Gathering of Forest Products"
    },
    {
        "code": "1133",
        "description": "Logging"
    },
    {
        "code": "11331",
        "description": "Logging"
    },
    {
        "code": "113310",
        "description": "Logging"
    },
    {
        "code": "114",
        "description": "Fishing, Hunting and Trapping"
    },
    {
        "code": "1141",
        "description": "Fishing"
    },
    {
        "code": "11411",
        "description": "Fishing"
    },
    {
        "code": "114111",
        "description": "Finfish Fishing"
    },
    {
        "code": "114112",
        "description": "Shellfish Fishing"
    },
    {
        "code": "114119",
        "description": "Other Marine Fishing"
    },
    {
        "code": "1142",
        "description": "Hunting and Trapping"
    },
    {
        "code": "11421",
        "description": "Hunting and Trapping"
    },
    {
        "code": "114210",
        "description": "Hunting and Trapping"
    },
    {
        "code": "115",
        "description": "Support Activities for Agriculture and Forestry"
    },
    {
        "code": "1151",
        "description": "Support Activities for Crop Production"
    },
    {
        "code": "11511",
        "description": "Support Activities for Crop Production"
    },
    {
        "code": "115111",
        "description": "Cotton Ginning"
    },
    {
        "code": "115112",
        "description": "Soil Preparation, Planting, and Cultivating"
    },
    {
        "code": "115113",
        "description": "Crop Harvesting, Primarily by Machine"
    },
    {
        "code": "115114",
        "description": "Postharvest Crop Activities (except Cotton Ginning)"
    },
    {
        "code": "115115",
        "description": "Farm Labor Contractors and Crew Leaders"
    },
    {
        "code": "115116",
        "description": "Farm Management Services"
    },
    {
        "code": "1152",
        "description": "Support Activities for Animal Production"
    },
    {
        "code": "11521",
        "description": "Support Activities for Animal Production"
    },
    {
        "code": "115210",
        "description": "Support Activities for Animal Production"
    },
    {
        "code": "1153",
        "description": "Support Activities for Forestry"
    },
    {
        "code": "11531",
        "description": "Support Activities for Forestry"
    },
    {
        "code": "115310",
        "description": "Support Activities for Forestry"
    },
    {
        "code": "21",
        "description": "Mining, Quarrying, and Oil and Gas Extraction"
    },
    {
        "code": "211",
        "description": "Oil and Gas Extraction"
    },
    {
        "code": "2111",
        "description": "Oil and Gas Extraction"
    },
    {
        "code": "21111",
        "description": "Oil and Gas Extraction"
    },
    {
        "code": "211111",
        "description": "Crude Petroleum and Natural Gas Extraction"
    },
    {
        "code": "211112",
        "description": "Natural Gas Liquid Extraction"
    },
    {
        "code": "212",
        "description": "Mining (except Oil and Gas)"
    },
    {
        "code": "2121",
        "description": "Coal Mining"
    },
    {
        "code": "21211",
        "description": "Coal Mining"
    },
    {
        "code": "212111",
        "description": "Bituminous Coal and Lignite Surface Mining"
    },
    {
        "code": "212112",
        "description": "Bituminous Coal Underground Mining"
    },
    {
        "code": "212113",
        "description": "Anthracite Mining"
    },
    {
        "code": "2122",
        "description": "Metal Ore Mining"
    },
    {
        "code": "21221",
        "description": "Iron Ore Mining"
    },
    {
        "code": "212210",
        "description": "Iron Ore Mining"
    },
    {
        "code": "21222",
        "description": "Gold Ore and Silver Ore Mining"
    },
    {
        "code": "212221",
        "description": "Gold Ore Mining"
    },
    {
        "code": "212222",
        "description": "Silver Ore Mining"
    },
    {
        "code": "21223",
        "description": "Copper, Nickel, Lead, and Zinc Mining"
    },
    {
        "code": "212231",
        "description": "Lead Ore and Zinc Ore Mining"
    },
    {
        "code": "212234",
        "description": "Copper Ore and Nickel Ore Mining"
    },
    {
        "code": "21229",
        "description": "Other Metal Ore Mining"
    },
    {
        "code": "212291",
        "description": "Uranium-Radium-Vanadium Ore Mining"
    },
    {
        "code": "212299",
        "description": "All Other Metal Ore Mining"
    },
    {
        "code": "2123",
        "description": "Nonmetallic Mineral Mining and Quarrying"
    },
    {
        "code": "21231",
        "description": "Stone Mining and Quarrying"
    },
    {
        "code": "212311",
        "description": "Dimension Stone Mining and Quarrying"
    },
    {
        "code": "212312",
        "description": "Crushed and Broken Limestone Mining and Quarrying"
    },
    {
        "code": "212313",
        "description": "Crushed and Broken Granite Mining and Quarrying"
    },
    {
        "code": "212319",
        "description": "Other Crushed and Broken Stone Mining and Quarrying"
    },
    {
        "code": "21232",
        "description": "Sand, Gravel, Clay, and Ceramic and Refractory Minerals Mining and Quarrying"
    },
    {
        "code": "212321",
        "description": "Construction Sand and Gravel Mining"
    },
    {
        "code": "212322",
        "description": "Industrial Sand Mining"
    },
    {
        "code": "212324",
        "description": "Kaolin and Ball Clay Mining"
    },
    {
        "code": "212325",
        "description": "Clay and Ceramic and Refractory Minerals Mining"
    },
    {
        "code": "21239",
        "description": "Other Nonmetallic Mineral Mining and Quarrying"
    },
    {
        "code": "212391",
        "description": "Potash, Soda, and Borate Mineral Mining"
    },
    {
        "code": "212392",
        "description": "Phosphate Rock Mining"
    },
    {
        "code": "212393",
        "description": "Other Chemical and Fertilizer Mineral Mining"
    },
    {
        "code": "212399",
        "description": "All Other Nonmetallic Mineral Mining"
    },
    {
        "code": "213",
        "description": "Support Activities for Mining"
    },
    {
        "code": "2131",
        "description": "Support Activities for Mining"
    },
    {
        "code": "21311",
        "description": "Support Activities for Mining"
    },
    {
        "code": "213111",
        "description": "Drilling Oil and Gas Wells"
    },
    {
        "code": "213112",
        "description": "Support Activities for Oil and Gas Operations"
    },
    {
        "code": "213113",
        "description": "Support Activities for Coal Mining"
    },
    {
        "code": "213114",
        "description": "Support Activities for Metal Mining"
    },
    {
        "code": "213115",
        "description": "Support Activities for Nonmetallic Minerals (except Fuels) Mining"
    },
    {
        "code": "22",
        "description": "Utilities"
    },
    {
        "code": "221",
        "description": "Utilities"
    },
    {
        "code": "2211",
        "description": "Electric Power Generation, Transmission and Distribution"
    },
    {
        "code": "22111",
        "description": "Electric Power Generation"
    },
    {
        "code": "221111",
        "description": "Hydroelectric Power Generation"
    },
    {
        "code": "221112",
        "description": "Fossil Fuel Electric Power Generation"
    },
    {
        "code": "221113",
        "description": "Nuclear Electric Power Generation"
    },
    {
        "code": "221114",
        "description": "Solar Electric Power Generation"
    },
    {
        "code": "221115",
        "description": "Wind Electric Power Generation"
    },
    {
        "code": "221116",
        "description": "Geothermal Electric Power Generation"
    },
    {
        "code": "221117",
        "description": "Biomass Electric Power Generation"
    },
    {
        "code": "221118",
        "description": "Other Electric Power Generation"
    },
    {
        "code": "22112",
        "description": "Electric Power Transmission, Control, and Distribution"
    },
    {
        "code": "221121",
        "description": "Electric Bulk Power Transmission and Control"
    },
    {
        "code": "221122",
        "description": "Electric Power Distribution"
    },
    {
        "code": "2212",
        "description": "Natural Gas Distribution"
    },
    {
        "code": "22121",
        "description": "Natural Gas Distribution"
    },
    {
        "code": "221210",
        "description": "Natural Gas Distribution"
    },
    {
        "code": "2213",
        "description": "Water, Sewage and Other Systems"
    },
    {
        "code": "22131",
        "description": "Water Supply and Irrigation Systems"
    },
    {
        "code": "221310",
        "description": "Water Supply and Irrigation Systems"
    },
    {
        "code": "22132",
        "description": "Sewage Treatment Facilities"
    },
    {
        "code": "221320",
        "description": "Sewage Treatment Facilities"
    },
    {
        "code": "22133",
        "description": "Steam and Air-Conditioning Supply"
    },
    {
        "code": "221330",
        "description": "Steam and Air-Conditioning Supply"
    },
    {
        "code": "23",
        "description": "Construction"
    },
    {
        "code": "236",
        "description": "Construction of Buildings"
    },
    {
        "code": "2361",
        "description": "Residential Building Construction"
    },
    {
        "code": "23611",
        "description": "Residential Building Construction"
    },
    {
        "code": "236115",
        "description": "New Single-Family Housing Construction (except For-Sale Builders)"
    },
    {
        "code": "236116",
        "description": "New Multifamily Housing Construction (except For-Sale Builders)"
    },
    {
        "code": "236117",
        "description": "New Housing For-Sale Builders"
    },
    {
        "code": "236118",
        "description": "Residential Remodelers"
    },
    {
        "code": "2362",
        "description": "Nonresidential Building Construction"
    },
    {
        "code": "23621",
        "description": "Industrial Building Construction"
    },
    {
        "code": "236210",
        "description": "Industrial Building Construction"
    },
    {
        "code": "23622",
        "description": "Commercial and Institutional Building Construction"
    },
    {
        "code": "236220",
        "description": "Commercial and Institutional Building Construction"
    },
    {
        "code": "237",
        "description": "Heavy and Civil Engineering Construction"
    },
    {
        "code": "2371",
        "description": "Utility System Construction"
    },
    {
        "code": "23711",
        "description": "Water and Sewer Line and Related Structures Construction"
    },
    {
        "code": "237110",
        "description": "Water and Sewer Line and Related Structures Construction"
    },
    {
        "code": "23712",
        "description": "Oil and Gas Pipeline and Related Structures Construction"
    },
    {
        "code": "237120",
        "description": "Oil and Gas Pipeline and Related Structures Construction"
    },
    {
        "code": "23713",
        "description": "Power and Communication Line and Related Structures Construction"
    },
    {
        "code": "237130",
        "description": "Power and Communication Line and Related Structures Construction"
    },
    {
        "code": "2372",
        "description": "Land Subdivision"
    },
    {
        "code": "23721",
        "description": "Land Subdivision"
    },
    {
        "code": "237210",
        "description": "Land Subdivision"
    },
    {
        "code": "2373",
        "description": "Highway, Street, and Bridge Construction"
    },
    {
        "code": "23731",
        "description": "Highway, Street, and Bridge Construction"
    },
    {
        "code": "237310",
        "description": "Highway, Street, and Bridge Construction"
    },
    {
        "code": "2379",
        "description": "Other Heavy and Civil Engineering Construction"
    },
    {
        "code": "23799",
        "description": "Other Heavy and Civil Engineering Construction"
    },
    {
        "code": "237990",
        "description": "Other Heavy and Civil Engineering Construction"
    },
    {
        "code": "238",
        "description": "Specialty Trade Contractors"
    },
    {
        "code": "2381",
        "description": "Foundation, Structure, and Building Exterior Contractors"
    },
    {
        "code": "23811",
        "description": "Poured Concrete Foundation and Structure Contractors"
    },
    {
        "code": "238110",
        "description": "Poured Concrete Foundation and Structure Contractors"
    },
    {
        "code": "23812",
        "description": "Structural Steel and Precast Concrete Contractors"
    },
    {
        "code": "238120",
        "description": "Structural Steel and Precast Concrete Contractors"
    },
    {
        "code": "23813",
        "description": "Framing Contractors"
    },
    {
        "code": "238130",
        "description": "Framing Contractors"
    },
    {
        "code": "23814",
        "description": "Masonry Contractors"
    },
    {
        "code": "238140",
        "description": "Masonry Contractors"
    },
    {
        "code": "23815",
        "description": "Glass and Glazing Contractors"
    },
    {
        "code": "238150",
        "description": "Glass and Glazing Contractors"
    },
    {
        "code": "23816",
        "description": "Roofing Contractors"
    },
    {
        "code": "238160",
        "description": "Roofing Contractors"
    },
    {
        "code": "23817",
        "description": "Siding Contractors"
    },
    {
        "code": "238170",
        "description": "Siding Contractors"
    },
    {
        "code": "23819",
        "description": "Other Foundation, Structure, and Building Exterior Contractors"
    },
    {
        "code": "238190",
        "description": "Other Foundation, Structure, and Building Exterior Contractors"
    },
    {
        "code": "2382",
        "description": "Building Equipment Contractors"
    },
    {
        "code": "23821",
        "description": "Electrical Contractors and Other Wiring Installation Contractors"
    },
    {
        "code": "238210",
        "description": "Electrical Contractors and Other Wiring Installation Contractors"
    },
    {
        "code": "23822",
        "description": "Plumbing, Heating, and Air-Conditioning Contractors"
    },
    {
        "code": "238220",
        "description": "Plumbing, Heating, and Air-Conditioning Contractors"
    },
    {
        "code": "23829",
        "description": "Other Building Equipment Contractors"
    },
    {
        "code": "238290",
        "description": "Other Building Equipment Contractors"
    },
    {
        "code": "2383",
        "description": "Building Finishing Contractors"
    },
    {
        "code": "23831",
        "description": "Drywall and Insulation Contractors"
    },
    {
        "code": "238310",
        "description": "Drywall and Insulation Contractors"
    },
    {
        "code": "23832",
        "description": "Painting and Wall Covering Contractors"
    },
    {
        "code": "238320",
        "description": "Painting and Wall Covering Contractors"
    },
    {
        "code": "23833",
        "description": "Flooring Contractors"
    },
    {
        "code": "238330",
        "description": "Flooring Contractors"
    },
    {
        "code": "23834",
        "description": "Tile and Terrazzo Contractors"
    },
    {
        "code": "238340",
        "description": "Tile and Terrazzo Contractors"
    },
    {
        "code": "23835",
        "description": "Finish Carpentry Contractors"
    },
    {
        "code": "238350",
        "description": "Finish Carpentry Contractors"
    },
    {
        "code": "23839",
        "description": "Other Building Finishing Contractors"
    },
    {
        "code": "238390",
        "description": "Other Building Finishing Contractors"
    },
    {
        "code": "2389",
        "description": "Other Specialty Trade Contractors"
    },
    {
        "code": "23891",
        "description": "Site Preparation Contractors"
    },
    {
        "code": "238910",
        "description": "Site Preparation Contractors"
    },
    {
        "code": "23899",
        "description": "All Other Specialty Trade Contractors"
    },
    {
        "code": "238990",
        "description": "All Other Specialty Trade Contractors"
    },
    {
        "code": "311",
        "description": "Food Manufacturing"
    },
    {
        "code": "3111",
        "description": "Animal Food Manufacturing"
    },
    {
        "code": "31111",
        "description": "Animal Food Manufacturing"
    },
    {
        "code": "311111",
        "description": "Dog and Cat Food Manufacturing"
    },
    {
        "code": "311119",
        "description": "Other Animal Food Manufacturing"
    },
    {
        "code": "3112",
        "description": "Grain and Oilseed Milling"
    },
    {
        "code": "31121",
        "description": "Flour Milling and Malt Manufacturing"
    },
    {
        "code": "311211",
        "description": "Flour Milling"
    },
    {
        "code": "311212",
        "description": "Rice Milling"
    },
    {
        "code": "311213",
        "description": "Malt Manufacturing"
    },
    {
        "code": "31122",
        "description": "Starch and Vegetable Fats and Oils Manufacturing"
    },
    {
        "code": "311221",
        "description": "Wet Corn Milling"
    },
    {
        "code": "311224",
        "description": "Soybean and Other Oilseed Processing"
    },
    {
        "code": "311225",
        "description": "Fats and Oils Refining and Blending"
    },
    {
        "code": "31123",
        "description": "Breakfast Cereal Manufacturing"
    },
    {
        "code": "311230",
        "description": "Breakfast Cereal Manufacturing"
    },
    {
        "code": "3113",
        "description": "Sugar and Confectionery Product Manufacturing"
    },
    {
        "code": "31131",
        "description": "Sugar Manufacturing"
    },
    {
        "code": "311313",
        "description": "Beet Sugar Manufacturing"
    },
    {
        "code": "311314",
        "description": "Cane Sugar Manufacturing"
    },
    {
        "code": "31134",
        "description": "Nonchocolate Confectionery Manufacturing"
    },
    {
        "code": "311340",
        "description": "Nonchocolate Confectionery Manufacturing"
    },
    {
        "code": "31135",
        "description": "Chocolate and Confectionery Manufacturing"
    },
    {
        "code": "311351",
        "description": "Chocolate and Confectionery Manufacturing from Cacao Beans"
    },
    {
        "code": "311352",
        "description": "Confectionery Manufacturing from Purchased Chocolate"
    },
    {
        "code": "3114",
        "description": "Fruit and Vegetable Preserving and Specialty Food Manufacturing"
    },
    {
        "code": "31141",
        "description": "Frozen Food Manufacturing"
    },
    {
        "code": "311411",
        "description": "Frozen Fruit, Juice, and Vegetable Manufacturing"
    },
    {
        "code": "311412",
        "description": "Frozen Specialty Food Manufacturing"
    },
    {
        "code": "31142",
        "description": "Fruit and Vegetable Canning, Pickling, and Drying"
    },
    {
        "code": "311421",
        "description": "Fruit and Vegetable Canning"
    },
    {
        "code": "311422",
        "description": "Specialty Canning"
    },
    {
        "code": "311423",
        "description": "Dried and Dehydrated Food Manufacturing"
    },
    {
        "code": "3115",
        "description": "Dairy Product Manufacturing"
    },
    {
        "code": "31151",
        "description": "Dairy Product (except Frozen) Manufacturing"
    },
    {
        "code": "311511",
        "description": "Fluid Milk Manufacturing"
    },
    {
        "code": "311512",
        "description": "Creamery Butter Manufacturing"
    },
    {
        "code": "311513",
        "description": "Cheese Manufacturing"
    },
    {
        "code": "311514",
        "description": "Dry, Condensed, and Evaporated Dairy Product Manufacturing"
    },
    {
        "code": "31152",
        "description": "Ice Cream and Frozen Dessert Manufacturing"
    },
    {
        "code": "311520",
        "description": "Ice Cream and Frozen Dessert Manufacturing"
    },
    {
        "code": "3116",
        "description": "Animal Slaughtering and Processing"
    },
    {
        "code": "31161",
        "description": "Animal Slaughtering and Processing"
    },
    {
        "code": "311611",
        "description": "Animal (except Poultry) Slaughtering"
    },
    {
        "code": "311612",
        "description": "Meat Processed from Carcasses"
    },
    {
        "code": "311613",
        "description": "Rendering and Meat Byproduct Processing"
    },
    {
        "code": "311615",
        "description": "Poultry Processing"
    },
    {
        "code": "3117",
        "description": "Seafood Product Preparation and Packaging"
    },
    {
        "code": "31171",
        "description": "Seafood Product Preparation and Packaging"
    },
    {
        "code": "311710",
        "description": "Seafood Product Preparation and Packaging"
    },
    {
        "code": "3118",
        "description": "Bakeries and Tortilla Manufacturing"
    },
    {
        "code": "31181",
        "description": "Bread and Bakery Product Manufacturing"
    },
    {
        "code": "311811",
        "description": "Retail Bakeries"
    },
    {
        "code": "311812",
        "description": "Commercial Bakeries"
    },
    {
        "code": "33152",
        "description": "Nonferrous Metal Foundries"
    },
    {
        "code": "311813",
        "description": "Frozen Cakes, Pies, and Other Pastries Manufacturing"
    },
    {
        "code": "31182",
        "description": "Cookie, Cracker, and Pasta Manufacturing"
    },
    {
        "code": "311821",
        "description": "Cookie and Cracker Manufacturing"
    },
    {
        "code": "311824",
        "description": "Dry Pasta, Dough, and Flour Mixes Manufacturing from Purchased Flour"
    },
    {
        "code": "31183",
        "description": "Tortilla Manufacturing"
    },
    {
        "code": "311830",
        "description": "Tortilla Manufacturing"
    },
    {
        "code": "3119",
        "description": "Other Food Manufacturing"
    },
    {
        "code": "31191",
        "description": "Snack Food Manufacturing"
    },
    {
        "code": "311911",
        "description": "Roasted Nuts and Peanut Butter Manufacturing"
    },
    {
        "code": "311919",
        "description": "Other Snack Food Manufacturing"
    },
    {
        "code": "31192",
        "description": "Coffee and Tea Manufacturing"
    },
    {
        "code": "311920",
        "description": "Coffee and Tea Manufacturing"
    },
    {
        "code": "31193",
        "description": "Flavoring Syrup and Concentrate Manufacturing"
    },
    {
        "code": "311930",
        "description": "Flavoring Syrup and Concentrate Manufacturing"
    },
    {
        "code": "31194",
        "description": "Seasoning and Dressing Manufacturing"
    },
    {
        "code": "311941",
        "description": "Mayonnaise, Dressing, and Other Prepared Sauce Manufacturing"
    },
    {
        "code": "311942",
        "description": "Spice and Extract Manufacturing"
    },
    {
        "code": "31199",
        "description": "All Other Food Manufacturing"
    },
    {
        "code": "311991",
        "description": "Perishable Prepared Food Manufacturing"
    },
    {
        "code": "311999",
        "description": "All Other Miscellaneous Food Manufacturing"
    },
    {
        "code": "312",
        "description": "Beverage and Tobacco Product Manufacturing"
    },
    {
        "code": "3121",
        "description": "Beverage Manufacturing"
    },
    {
        "code": "31211",
        "description": "Soft Drink and Ice Manufacturing"
    },
    {
        "code": "312111",
        "description": "Soft Drink Manufacturing"
    },
    {
        "code": "312112",
        "description": "Bottled Water Manufacturing"
    },
    {
        "code": "312113",
        "description": "Ice Manufacturing"
    },
    {
        "code": "31212",
        "description": "Breweries"
    },
    {
        "code": "312120",
        "description": "Breweries"
    },
    {
        "code": "31213",
        "description": "Wineries"
    },
    {
        "code": "312130",
        "description": "Wineries"
    },
    {
        "code": "31214",
        "description": "Distilleries"
    },
    {
        "code": "312140",
        "description": "Distilleries"
    },
    {
        "code": "3122",
        "description": "Tobacco Manufacturing"
    },
    {
        "code": "31223",
        "description": "Tobacco Manufacturing"
    },
    {
        "code": "312230",
        "description": "Tobacco Manufacturing"
    },
    {
        "code": "313",
        "description": "Textile Mills"
    },
    {
        "code": "3131",
        "description": "Fiber, Yarn, and Thread Mills"
    },
    {
        "code": "31311",
        "description": "Fiber, Yarn, and Thread Mills"
    },
    {
        "code": "313110",
        "description": "Fiber, Yarn, and Thread Mills"
    },
    {
        "code": "3132",
        "description": "Fabric Mills"
    },
    {
        "code": "31321",
        "description": "Broadwoven Fabric Mills"
    },
    {
        "code": "313210",
        "description": "Broadwoven Fabric Mills"
    },
    {
        "code": "31322",
        "description": "Narrow Fabric Mills and Schiffli Machine Embroidery"
    },
    {
        "code": "313220",
        "description": "Narrow Fabric Mills and Schiffli Machine Embroidery"
    },
    {
        "code": "31323",
        "description": "Nonwoven Fabric Mills"
    },
    {
        "code": "313230",
        "description": "Nonwoven Fabric Mills"
    },
    {
        "code": "31324",
        "description": "Knit Fabric Mills"
    },
    {
        "code": "313240",
        "description": "Knit Fabric Mills"
    },
    {
        "code": "3133",
        "description": "Textile and Fabric Finishing and Fabric Coating Mills"
    },
    {
        "code": "31331",
        "description": "Textile and Fabric Finishing Mills"
    },
    {
        "code": "313310",
        "description": "Textile and Fabric Finishing Mills"
    },
    {
        "code": "31332",
        "description": "Fabric Coating Mills"
    },
    {
        "code": "313320",
        "description": "Fabric Coating Mills"
    },
    {
        "code": "314",
        "description": "Textile Product Mills"
    },
    {
        "code": "3141",
        "description": "Textile Furnishings Mills"
    },
    {
        "code": "31411",
        "description": "Carpet and Rug Mills"
    },
    {
        "code": "314110",
        "description": "Carpet and Rug Mills"
    },
    {
        "code": "31412",
        "description": "Curtain and Linen Mills"
    },
    {
        "code": "314120",
        "description": "Curtain and Linen Mills"
    },
    {
        "code": "3149",
        "description": "Other Textile Product Mills"
    },
    {
        "code": "31491",
        "description": "Textile Bag and Canvas Mills"
    },
    {
        "code": "314910",
        "description": "Textile Bag and Canvas Mills"
    },
    {
        "code": "31499",
        "description": "All Other Textile Product Mills"
    },
    {
        "code": "314994",
        "description": "Rope, Cordage, Twine, Tire Cord, and Tire Fabric Mills"
    },
    {
        "code": "314999",
        "description": "All Other Miscellaneous Textile Product Mills"
    },
    {
        "code": "315",
        "description": "Apparel Manufacturing"
    },
    {
        "code": "3151",
        "description": "Apparel Knitting Mills"
    },
    {
        "code": "31511",
        "description": "Hosiery and Sock Mills"
    },
    {
        "code": "315110",
        "description": "Hosiery and Sock Mills"
    },
    {
        "code": "31519",
        "description": "Other Apparel Knitting Mills"
    },
    {
        "code": "315190",
        "description": "Other Apparel Knitting Mills"
    },
    {
        "code": "3152",
        "description": "Cut and Sew Apparel Manufacturing"
    },
    {
        "code": "31521",
        "description": "Cut and Sew Apparel Contractors"
    },
    {
        "code": "315210",
        "description": "Cut and Sew Apparel Contractors"
    },
    {
        "code": "31522",
        "description": "Mens and Boys Cut and Sew Apparel Manufacturing"
    },
    {
        "code": "315220",
        "description": "Mens and Boys Cut and Sew Apparel Manufacturing"
    },
    {
        "code": "31524",
        "description": "Womens, Girls, and Infants Cut and Sew Apparel Manufacturing"
    },
    {
        "code": "315240",
        "description": "Womens, Girls, and Infants Cut and Sew Apparel Manufacturing"
    },
    {
        "code": "31528",
        "description": "Other Cut and Sew Apparel Manufacturing"
    },
    {
        "code": "315280",
        "description": "Other Cut and Sew Apparel Manufacturing"
    },
    {
        "code": "3159",
        "description": "Apparel Accessories and Other Apparel Manufacturing"
    },
    {
        "code": "31599",
        "description": "Apparel Accessories and Other Apparel Manufacturing"
    },
    {
        "code": "315990",
        "description": "Apparel Accessories and Other Apparel Manufacturing"
    },
    {
        "code": "316",
        "description": "Leather and Allied Product Manufacturing"
    },
    {
        "code": "3161",
        "description": "Leather and Hide Tanning and Finishing"
    },
    {
        "code": "31611",
        "description": "Leather and Hide Tanning and Finishing"
    },
    {
        "code": "316110",
        "description": "Leather and Hide Tanning and Finishing"
    },
    {
        "code": "3162",
        "description": "Footwear Manufacturing"
    },
    {
        "code": "31621",
        "description": "Footwear Manufacturing"
    },
    {
        "code": "316210",
        "description": "Footwear Manufacturing"
    },
    {
        "code": "3169",
        "description": "Other Leather and Allied Product Manufacturing"
    },
    {
        "code": "31699",
        "description": "Other Leather and Allied Product Manufacturing"
    },
    {
        "code": "316992",
        "description": "Women's Handbag and Purse Manufacturing"
    },
    {
        "code": "316998",
        "description": "All Other Leather Good and Allied Product Manufacturing"
    },
    {
        "code": "321",
        "description": "Wood Product Manufacturing"
    },
    {
        "code": "3211",
        "description": "Sawmills and Wood Preservation"
    },
    {
        "code": "32111",
        "description": "Sawmills and Wood Preservation"
    },
    {
        "code": "321113",
        "description": "Sawmills"
    },
    {
        "code": "321114",
        "description": "Wood Preservation"
    },
    {
        "code": "3212",
        "description": "Veneer, Plywood, and Engineered Wood Product Manufacturing"
    },
    {
        "code": "32121",
        "description": "Veneer, Plywood, and Engineered Wood Product Manufacturing"
    },
    {
        "code": "321211",
        "description": "Hardwood Veneer and Plywood Manufacturing"
    },
    {
        "code": "321212",
        "description": "Softwood Veneer and Plywood Manufacturing"
    },
    {
        "code": "321213",
        "description": "Engineered Wood Member (except Truss) Manufacturing"
    },
    {
        "code": "321214",
        "description": "Truss Manufacturing"
    },
    {
        "code": "321219",
        "description": "Reconstituted Wood Product Manufacturing"
    },
    {
        "code": "3219",
        "description": "Other Wood Product Manufacturing"
    },
    {
        "code": "32191",
        "description": "Millwork"
    },
    {
        "code": "321911",
        "description": "Wood Window and Door Manufacturing"
    },
    {
        "code": "321912",
        "description": "Cut Stock, Resawing Lumber, and Planing"
    },
    {
        "code": "321918",
        "description": "Other Millwork (including Flooring)"
    },
    {
        "code": "32192",
        "description": "Wood Container and Pallet Manufacturing"
    },
    {
        "code": "321920",
        "description": "Wood Container and Pallet Manufacturing"
    },
    {
        "code": "32199",
        "description": "All Other Wood Product Manufacturing"
    },
    {
        "code": "321991",
        "description": "Manufactured Home (Mobile Home) Manufacturing"
    },
    {
        "code": "321992",
        "description": "Prefabricated Wood Building Manufacturing"
    },
    {
        "code": "321999",
        "description": "All Other Miscellaneous Wood Product Manufacturing"
    },
    {
        "code": "322",
        "description": "Paper Manufacturing"
    },
    {
        "code": "3221",
        "description": "Pulp, Paper, and Paperboard Mills"
    },
    {
        "code": "32211",
        "description": "Pulp Mills"
    },
    {
        "code": "322110",
        "description": "Pulp Mills"
    },
    {
        "code": "32212",
        "description": "Paper Mills"
    },
    {
        "code": "322121",
        "description": "Paper (except Newsprint) Mills"
    },
    {
        "code": "322122",
        "description": "Newsprint Mills"
    },
    {
        "code": "32213",
        "description": "Paperboard Mills"
    },
    {
        "code": "322130",
        "description": "Paperboard Mills"
    },
    {
        "code": "3222",
        "description": "Converted Paper Product Manufacturing"
    },
    {
        "code": "32221",
        "description": "Paperboard Container Manufacturing"
    },
    {
        "code": "322211",
        "description": "Corrugated and Solid Fiber Box Manufacturing"
    },
    {
        "code": "322212",
        "description": "Folding Paperboard Box Manufacturing"
    },
    {
        "code": "322219",
        "description": "Other Paperboard Container Manufacturing"
    },
    {
        "code": "32222",
        "description": "Paper Bag and Coated and Treated Paper Manufacturing"
    },
    {
        "code": "322220",
        "description": "Paper Bag and Coated and Treated Paper Manufacturing"
    },
    {
        "code": "32223",
        "description": "Stationery Product Manufacturing"
    },
    {
        "code": "322230",
        "description": "Stationery Product Manufacturing"
    },
    {
        "code": "32229",
        "description": "Other Converted Paper Product Manufacturing"
    },
    {
        "code": "322291",
        "description": "Sanitary Paper Product Manufacturing"
    },
    {
        "code": "322299",
        "description": "All Other Converted Paper Product Manufacturing"
    },
    {
        "code": "323",
        "description": "Printing and Related Support Activities"
    },
    {
        "code": "3231",
        "description": "Printing and Related Support Activities"
    },
    {
        "code": "32311",
        "description": "Printing"
    },
    {
        "code": "323111",
        "description": "Commercial Printing (except Screen and Books)"
    },
    {
        "code": "323113",
        "description": "Commercial Screen Printing"
    },
    {
        "code": "323117",
        "description": "Books Printing"
    },
    {
        "code": "32312",
        "description": "Support Activities for Printing"
    },
    {
        "code": "323120",
        "description": "Support Activities for Printing"
    },
    {
        "code": "324",
        "description": "Petroleum and Coal Products Manufacturing"
    },
    {
        "code": "3241",
        "description": "Petroleum and Coal Products Manufacturing"
    },
    {
        "code": "32411",
        "description": "Petroleum Refineries"
    },
    {
        "code": "324110",
        "description": "Petroleum Refineries"
    },
    {
        "code": "32412",
        "description": "Asphalt Paving, Roofing, and Saturated Materials Manufacturing"
    },
    {
        "code": "324121",
        "description": "Asphalt Paving Mixture and Block Manufacturing"
    },
    {
        "code": "324122",
        "description": "Asphalt Shingle and Coating Materials Manufacturing"
    },
    {
        "code": "32419",
        "description": "Other Petroleum and Coal Products Manufacturing"
    },
    {
        "code": "324191",
        "description": "Petroleum Lubricating Oil and Grease Manufacturing"
    },
    {
        "code": "324199",
        "description": "All Other Petroleum and Coal Products Manufacturing"
    },
    {
        "code": "325",
        "description": "Chemical Manufacturing"
    },
    {
        "code": "3251",
        "description": "Basic Chemical Manufacturing"
    },
    {
        "code": "32511",
        "description": "Petrochemical Manufacturing"
    },
    {
        "code": "325110",
        "description": "Petrochemical Manufacturing"
    },
    {
        "code": "32512",
        "description": "Industrial Gas Manufacturing"
    },
    {
        "code": "325120",
        "description": "Industrial Gas Manufacturing"
    },
    {
        "code": "32513",
        "description": "Synthetic Dye and Pigment Manufacturing"
    },
    {
        "code": "325130",
        "description": "Synthetic Dye and Pigment Manufacturing"
    },
    {
        "code": "32518",
        "description": "Other Basic Inorganic Chemical Manufacturing"
    },
    {
        "code": "325180",
        "description": "Other Basic Inorganic Chemical Manufacturing"
    },
    {
        "code": "32519",
        "description": "Other Basic Organic Chemical Manufacturing"
    },
    {
        "code": "325193",
        "description": "Ethyl Alcohol Manufacturing"
    },
    {
        "code": "325194",
        "description": "Cyclic Crude, Intermediate, and Gum and Wood Chemical Manufacturing"
    },
    {
        "code": "325199",
        "description": "All Other Basic Organic Chemical Manufacturing"
    },
    {
        "code": "3252",
        "description": "Resin, Synthetic Rubber, and Artificial Synthetic Fibers and Filaments Manufacturing"
    },
    {
        "code": "32521",
        "description": "Resin and Synthetic Rubber Manufacturing"
    },
    {
        "code": "325211",
        "description": "Plastics Material and Resin Manufacturing"
    },
    {
        "code": "325212",
        "description": "Synthetic Rubber Manufacturing"
    },
    {
        "code": "32522",
        "description": "Artificial and Synthetic Fibers and Filaments Manufacturing"
    },
    {
        "code": "325220",
        "description": "Artificial and Synthetic Fibers and Filaments Manufacturing"
    },
    {
        "code": "3253",
        "description": "Pesticide, Fertilizer, and Other Agricultural Chemical Manufacturing"
    },
    {
        "code": "32531",
        "description": "Fertilizer Manufacturing"
    },
    {
        "code": "325311",
        "description": "Nitrogenous Fertilizer Manufacturing"
    },
    {
        "code": "325312",
        "description": "Phosphatic Fertilizer Manufacturing"
    },
    {
        "code": "325314",
        "description": "Fertilizer (Mixing Only) Manufacturing"
    },
    {
        "code": "32532",
        "description": "Pesticide and Other Agricultural Chemical Manufacturing"
    },
    {
        "code": "325320",
        "description": "Pesticide and Other Agricultural Chemical Manufacturing"
    },
    {
        "code": "3254",
        "description": "Pharmaceutical and Medicine Manufacturing"
    },
    {
        "code": "32541",
        "description": "Pharmaceutical and Medicine Manufacturing"
    },
    {
        "code": "325411",
        "description": "Medicinal and Botanical Manufacturing"
    },
    {
        "code": "325412",
        "description": "Pharmaceutical Preparation Manufacturing"
    },
    {
        "code": "325413",
        "description": "In-Vitro Diagnostic Substance Manufacturing"
    },
    {
        "code": "325414",
        "description": "Biological Product (except Diagnostic) Manufacturing"
    },
    {
        "code": "3255",
        "description": "Paint, Coating, and Adhesive Manufacturing"
    },
    {
        "code": "32551",
        "description": "Paint and Coating Manufacturing"
    },
    {
        "code": "325510",
        "description": "Paint and Coating Manufacturing"
    },
    {
        "code": "32552",
        "description": "Adhesive Manufacturing"
    },
    {
        "code": "325520",
        "description": "Adhesive Manufacturing"
    },
    {
        "code": "3256",
        "description": "Soap, Cleaning Compound, and Toilet Preparation Manufacturing"
    },
    {
        "code": "32561",
        "description": "Soap and Cleaning Compound Manufacturing"
    },
    {
        "code": "325611",
        "description": "Soap and Other Detergent Manufacturing"
    },
    {
        "code": "325612",
        "description": "Polish and Other Sanitation Good Manufacturing"
    },
    {
        "code": "325613",
        "description": "Surface Active Agent Manufacturing"
    },
    {
        "code": "32562",
        "description": "Toilet Preparation Manufacturing"
    },
    {
        "code": "325620",
        "description": "Toilet Preparation Manufacturing"
    },
    {
        "code": "3259",
        "description": "Other Chemical Product and Preparation Manufacturing"
    },
    {
        "code": "32591",
        "description": "Printing Ink Manufacturing"
    },
    {
        "code": "325910",
        "description": "Printing Ink Manufacturing"
    },
    {
        "code": "32592",
        "description": "Explosives Manufacturing"
    },
    {
        "code": "325920",
        "description": "Explosives Manufacturing"
    },
    {
        "code": "32599",
        "description": "All Other Chemical Product and Preparation Manufacturing"
    },
    {
        "code": "325991",
        "description": "Custom Compounding of Purchased Resins"
    },
    {
        "code": "325992",
        "description": "Photographic Film, Paper, Plate, and Chemical Manufacturing"
    },
    {
        "code": "511110",
        "description": "Newspaper Publishers"
    },
    {
        "code": "325998",
        "description": "All Other Miscellaneous Chemical Product and Preparation Manufacturing"
    },
    {
        "code": "326",
        "description": "Plastics and Rubber Products Manufacturing"
    },
    {
        "code": "3261",
        "description": "Plastics Product Manufacturing"
    },
    {
        "code": "32611",
        "description": "Plastics Packaging Materials and Unlaminated Film and Sheet Manufacturing"
    },
    {
        "code": "326111",
        "description": "Plastics Bag and Pouch Manufacturing"
    },
    {
        "code": "326112",
        "description": "Plastics Packaging Film and Sheet (including Laminated) Manufacturing"
    },
    {
        "code": "326113",
        "description": "Unlaminated Plastics Film and Sheet (except Packaging) Manufacturing"
    },
    {
        "code": "32612",
        "description": "Plastics Pipe, Pipe Fitting, and Unlaminated Profile Shape Manufacturing"
    },
    {
        "code": "326121",
        "description": "Unlaminated Plastics Profile Shape Manufacturing"
    },
    {
        "code": "326122",
        "description": "Plastics Pipe and Pipe Fitting Manufacturing"
    },
    {
        "code": "32613",
        "description": "Laminated Plastics Plate, Sheet (except Packaging), and Shape Manufacturing"
    },
    {
        "code": "326130",
        "description": "Laminated Plastics Plate, Sheet (except Packaging), and Shape Manufacturing"
    },
    {
        "code": "32614",
        "description": "Polystyrene Foam Product Manufacturing"
    },
    {
        "code": "326140",
        "description": "Polystyrene Foam Product Manufacturing"
    },
    {
        "code": "32615",
        "description": "Urethane and Other Foam Product (except Polystyrene) Manufacturing"
    },
    {
        "code": "326150",
        "description": "Urethane and Other Foam Product (except Polystyrene) Manufacturing"
    },
    {
        "code": "32616",
        "description": "Plastics Bottle Manufacturing"
    },
    {
        "code": "326160",
        "description": "Plastics Bottle Manufacturing"
    },
    {
        "code": "32619",
        "description": "Other Plastics Product Manufacturing"
    },
    {
        "code": "326191",
        "description": "Plastics Plumbing Fixture Manufacturing"
    },
    {
        "code": "326199",
        "description": "All Other Plastics Product Manufacturing"
    },
    {
        "code": "3262",
        "description": "Rubber Product Manufacturing"
    },
    {
        "code": "32621",
        "description": "Tire Manufacturing"
    },
    {
        "code": "4869",
        "description": "Other Pipeline Transportation"
    },
    {
        "code": "326211",
        "description": "Tire Manufacturing (except Retreading)"
    },
    {
        "code": "326212",
        "description": "Tire Retreading"
    },
    {
        "code": "32622",
        "description": "Rubber and Plastics Hoses and Belting Manufacturing"
    },
    {
        "code": "326220",
        "description": "Rubber and Plastics Hoses and Belting Manufacturing"
    },
    {
        "code": "32629",
        "description": "Other Rubber Product Manufacturing"
    },
    {
        "code": "326291",
        "description": "Rubber Product Manufacturing for Mechanical Use"
    },
    {
        "code": "326299",
        "description": "All Other Rubber Product Manufacturing"
    },
    {
        "code": "327",
        "description": "Nonmetallic Mineral Product Manufacturing"
    },
    {
        "code": "3271",
        "description": "Clay Product and Refractory Manufacturing"
    },
    {
        "code": "32711",
        "description": "Pottery, Ceramics, and Plumbing Fixture Manufacturing"
    },
    {
        "code": "327110",
        "description": "Pottery, Ceramics, and Plumbing Fixture Manufacturing"
    },
    {
        "code": "32712",
        "description": "Clay Building Material and Refractories Manufacturing"
    },
    {
        "code": "327120",
        "description": "Clay Building Material and Refractories Manufacturing"
    },
    {
        "code": "3272",
        "description": "Glass and Glass Product Manufacturing"
    },
    {
        "code": "32721",
        "description": "Glass and Glass Product Manufacturing"
    },
    {
        "code": "327211",
        "description": "Flat Glass Manufacturing"
    },
    {
        "code": "327212",
        "description": "Other Pressed and Blown Glass and Glassware Manufacturing"
    },
    {
        "code": "327213",
        "description": "Glass Container Manufacturing"
    },
    {
        "code": "327215",
        "description": "Glass Product Manufacturing Made of Purchased Glass"
    },
    {
        "code": "3273",
        "description": "Cement and Concrete Product Manufacturing"
    },
    {
        "code": "32731",
        "description": "Cement Manufacturing"
    },
    {
        "code": "327310",
        "description": "Cement Manufacturing"
    },
    {
        "code": "32732",
        "description": "Ready-Mix Concrete Manufacturing"
    },
    {
        "code": "327320",
        "description": "Ready-Mix Concrete Manufacturing"
    },
    {
        "code": "32733",
        "description": "Concrete Pipe, Brick, and Block Manufacturing"
    },
    {
        "code": "327331",
        "description": "Concrete Block and Brick Manufacturing"
    },
    {
        "code": "327332",
        "description": "Concrete Pipe Manufacturing"
    },
    {
        "code": "32739",
        "description": "Other Concrete Product Manufacturing"
    },
    {
        "code": "327390",
        "description": "Other Concrete Product Manufacturing"
    },
    {
        "code": "3274",
        "description": "Lime and Gypsum Product Manufacturing"
    },
    {
        "code": "32741",
        "description": "Lime Manufacturing"
    },
    {
        "code": "327410",
        "description": "Lime Manufacturing"
    },
    {
        "code": "32742",
        "description": "Gypsum Product Manufacturing"
    },
    {
        "code": "327420",
        "description": "Gypsum Product Manufacturing"
    },
    {
        "code": "3279",
        "description": "Other Nonmetallic Mineral Product Manufacturing"
    },
    {
        "code": "32791",
        "description": "Abrasive Product Manufacturing"
    },
    {
        "code": "327910",
        "description": "Abrasive Product Manufacturing"
    },
    {
        "code": "32799",
        "description": "All Other Nonmetallic Mineral Product Manufacturing"
    },
    {
        "code": "327991",
        "description": "Cut Stone and Stone Product Manufacturing"
    },
    {
        "code": "327992",
        "description": "Ground or Treated Mineral and Earth Manufacturing"
    },
    {
        "code": "327993",
        "description": "Mineral Wool Manufacturing"
    },
    {
        "code": "327999",
        "description": "All Other Miscellaneous Nonmetallic Mineral Product Manufacturing"
    },
    {
        "code": "331",
        "description": "Primary Metal Manufacturing"
    },
    {
        "code": "3311",
        "description": "Iron and Steel Mills and Ferroalloy Manufacturing"
    },
    {
        "code": "33111",
        "description": "Iron and Steel Mills and Ferroalloy Manufacturing"
    },
    {
        "code": "331110",
        "description": "Iron and Steel Mills and Ferroalloy Manufacturing"
    },
    {
        "code": "3312",
        "description": "Steel Product Manufacturing from Purchased Steel"
    },
    {
        "code": "33121",
        "description": "Iron and Steel Pipe and Tube Manufacturing from Purchased Steel"
    },
    {
        "code": "331210",
        "description": "Iron and Steel Pipe and Tube Manufacturing from Purchased Steel"
    },
    {
        "code": "33122",
        "description": "Rolling and Drawing of Purchased Steel"
    },
    {
        "code": "331221",
        "description": "Rolled Steel Shape Manufacturing"
    },
    {
        "code": "331222",
        "description": "Steel Wire Drawing"
    },
    {
        "code": "3313",
        "description": "Alumina and Aluminum Production and Processing"
    },
    {
        "code": "33131",
        "description": "Alumina and Aluminum Production and Processing"
    },
    {
        "code": "331313",
        "description": "Alumina Refining and Primary Aluminum Production"
    },
    {
        "code": "331314",
        "description": "Secondary Smelting and Alloying of Aluminum"
    },
    {
        "code": "331315",
        "description": "Aluminum Sheet, Plate, and Foil Manufacturing"
    },
    {
        "code": "331318",
        "description": "Other Aluminum Rolling, Drawing, and Extruding"
    },
    {
        "code": "3314",
        "description": "Nonferrous Metal (except Aluminum) Production and Processing"
    },
    {
        "code": "33141",
        "description": "Nonferrous Metal (except Aluminum) Smelting and Refining"
    },
    {
        "code": "331410",
        "description": "Nonferrous Metal (except Aluminum) Smelting and Refining"
    },
    {
        "code": "33142",
        "description": "Copper Rolling, Drawing, Extruding, and Alloying"
    },
    {
        "code": "331420",
        "description": "Copper Rolling, Drawing, Extruding, and Alloying"
    },
    {
        "code": "33149",
        "description": "Nonferrous Metal (except Copper and Aluminum) Rolling, Drawing, Extruding, and Alloying"
    },
    {
        "code": "331491",
        "description": "Nonferrous Metal (except Copper and Aluminum) Rolling, Drawing, and Extruding"
    },
    {
        "code": "331492",
        "description": "Secondary Smelting, Refining, and Alloying of Nonferrous Metal (except Copper and Aluminum)"
    },
    {
        "code": "3315",
        "description": "Foundries"
    },
    {
        "code": "33151",
        "description": "Ferrous Metal Foundries"
    },
    {
        "code": "331511",
        "description": "Iron Foundries"
    },
    {
        "code": "331512",
        "description": "Steel Investment Foundries"
    },
    {
        "code": "331513",
        "description": "Steel Foundries (except Investment)"
    },
    {
        "code": "331523",
        "description": "Nonferrous Metal Die-Casting Foundries"
    },
    {
        "code": "331524",
        "description": "Aluminum Foundries (except Die-Casting)"
    },
    {
        "code": "331529",
        "description": "Other Nonferrous Metal Foundries (except Die-Casting)"
    },
    {
        "code": "332",
        "description": "Fabricated Metal Product Manufacturing"
    },
    {
        "code": "3321",
        "description": "Forging and Stamping"
    },
    {
        "code": "33211",
        "description": "Forging and Stamping"
    },
    {
        "code": "332111",
        "description": "Iron and Steel Forging"
    },
    {
        "code": "332112",
        "description": "Nonferrous Forging"
    },
    {
        "code": "332114",
        "description": "Custom Roll Forming"
    },
    {
        "code": "332117",
        "description": "Powder Metallurgy Part Manufacturing"
    },
    {
        "code": "332119",
        "description": "Metal Crown, Closure, and Other Metal Stamping (except Automotive)"
    },
    {
        "code": "3322",
        "description": "Cutlery and Handtool Manufacturing"
    },
    {
        "code": "33221",
        "description": "Cutlery and Handtool Manufacturing"
    },
    {
        "code": "332215",
        "description": "Metal Kitchen Cookware, Utensil, Cutlery, and Flatware (except Precious) Manufacturing"
    },
    {
        "code": "332216",
        "description": "Saw Blade and Handtool Manufacturing"
    },
    {
        "code": "3323",
        "description": "Architectural and Structural Metals Manufacturing"
    },
    {
        "code": "33231",
        "description": "Plate Work and Fabricated Structural Product Manufacturing"
    },
    {
        "code": "332311",
        "description": "Prefabricated Metal Building and Component Manufacturing"
    },
    {
        "code": "332312",
        "description": "Fabricated Structural Metal Manufacturing"
    },
    {
        "code": "332313",
        "description": "Plate Work Manufacturing"
    },
    {
        "code": "33232",
        "description": "Ornamental and Architectural Metal Products Manufacturing"
    },
    {
        "code": "332321",
        "description": "Metal Window and Door Manufacturing"
    },
    {
        "code": "332322",
        "description": "Sheet Metal Work Manufacturing"
    },
    {
        "code": "332323",
        "description": "Ornamental and Architectural Metal Work Manufacturing"
    },
    {
        "code": "3324",
        "description": "Boiler, Tank, and Shipping Container Manufacturing"
    },
    {
        "code": "33241",
        "description": "Power Boiler and Heat Exchanger Manufacturing"
    },
    {
        "code": "332410",
        "description": "Power Boiler and Heat Exchanger Manufacturing"
    },
    {
        "code": "33242",
        "description": "Metal Tank (Heavy Gauge) Manufacturing"
    },
    {
        "code": "332420",
        "description": "Metal Tank (Heavy Gauge) Manufacturing"
    },
    {
        "code": "33243",
        "description": "Metal Can, Box, and Other Metal Container (Light Gauge) Manufacturing"
    },
    {
        "code": "332431",
        "description": "Metal Can Manufacturing"
    },
    {
        "code": "332439",
        "description": "Other Metal Container Manufacturing"
    },
    {
        "code": "3325",
        "description": "Hardware Manufacturing"
    },
    {
        "code": "33251",
        "description": "Hardware Manufacturing"
    },
    {
        "code": "332510",
        "description": "Hardware Manufacturing"
    },
    {
        "code": "3326",
        "description": "Spring and Wire Product Manufacturing"
    },
    {
        "code": "33261",
        "description": "Spring and Wire Product Manufacturing"
    },
    {
        "code": "332613",
        "description": "Spring Manufacturing"
    },
    {
        "code": "332618",
        "description": "Other Fabricated Wire Product Manufacturing"
    },
    {
        "code": "3327",
        "description": "Machine Shops; Turned Product; and Screw, Nut, and Bolt Manufacturing"
    },
    {
        "code": "33271",
        "description": "Machine Shops"
    },
    {
        "code": "332710",
        "description": "Machine Shops"
    },
    {
        "code": "33272",
        "description": "Turned Product and Screw, Nut, and Bolt Manufacturing"
    },
    {
        "code": "332721",
        "description": "Precision Turned Product Manufacturing"
    },
    {
        "code": "332722",
        "description": "Bolt, Nut, Screw, Rivet, and Washer Manufacturing"
    },
    {
        "code": "3328",
        "description": "Coating, Engraving, Heat Treating, and Allied Activities"
    },
    {
        "code": "33281",
        "description": "Coating, Engraving, Heat Treating, and Allied Activities"
    },
    {
        "code": "332811",
        "description": "Metal Heat Treating"
    },
    {
        "code": "332812",
        "description": "Metal Coating, Engraving (except Jewelry and Silverware), and Allied Services to Manufacturers"
    },
    {
        "code": "332813",
        "description": "Electroplating, Plating, Polishing, Anodizing, and Coloring"
    },
    {
        "code": "3329",
        "description": "Other Fabricated Metal Product Manufacturing"
    },
    {
        "code": "33291",
        "description": "Metal Valve Manufacturing"
    },
    {
        "code": "332911",
        "description": "Industrial Valve Manufacturing"
    },
    {
        "code": "332912",
        "description": "Fluid Power Valve and Hose Fitting Manufacturing"
    },
    {
        "code": "332913",
        "description": "Plumbing Fixture Fitting and Trim Manufacturing"
    },
    {
        "code": "332919",
        "description": "Other Metal Valve and Pipe Fitting Manufacturing"
    },
    {
        "code": "33299",
        "description": "All Other Fabricated Metal Product Manufacturing"
    },
    {
        "code": "332991",
        "description": "Ball and Roller Bearing Manufacturing"
    },
    {
        "code": "332992",
        "description": "Small Arms Ammunition Manufacturing"
    },
    {
        "code": "332993",
        "description": "Ammunition (except Small Arms) Manufacturing"
    },
    {
        "code": "332994",
        "description": "Small Arms, Ordnance, and Ordnance Accessories Manufacturing"
    },
    {
        "code": "332996",
        "description": "Fabricated Pipe and Pipe Fitting Manufacturing"
    },
    {
        "code": "332999",
        "description": "All Other Miscellaneous Fabricated Metal Product Manufacturing"
    },
    {
        "code": "333",
        "description": "Machinery Manufacturing"
    },
    {
        "code": "3331",
        "description": "Agriculture, Construction, and Mining Machinery Manufacturing"
    },
    {
        "code": "33311",
        "description": "Agricultural Implement Manufacturing"
    },
    {
        "code": "333111",
        "description": "Farm Machinery and Equipment Manufacturing"
    },
    {
        "code": "333112",
        "description": "Lawn and Garden Tractor and Home Lawn and Garden Equipment Manufacturing"
    },
    {
        "code": "33312",
        "description": "Construction Machinery Manufacturing"
    },
    {
        "code": "333120",
        "description": "Construction Machinery Manufacturing"
    },
    {
        "code": "33313",
        "description": "Mining and Oil and Gas Field Machinery Manufacturing"
    },
    {
        "code": "333131",
        "description": "Mining Machinery and Equipment Manufacturing"
    },
    {
        "code": "333132",
        "description": "Oil and Gas Field Machinery and Equipment Manufacturing"
    },
    {
        "code": "3332",
        "description": "Industrial Machinery Manufacturing"
    },
    {
        "code": "33324",
        "description": "Industrial Machinery Manufacturing"
    },
    {
        "code": "333241",
        "description": "Food Product Machinery Manufacturing"
    },
    {
        "code": "333242",
        "description": "Semiconductor Machinery Manufacturing"
    },
    {
        "code": "333243",
        "description": "Sawmill, Woodworking, and Paper Machinery Manufacturing"
    },
    {
        "code": "333244",
        "description": "Printing Machinery and Equipment Manufacturing"
    },
    {
        "code": "333249",
        "description": "Other Industrial Machinery Manufacturing"
    },
    {
        "code": "3333",
        "description": "Commercial and Service Industry Machinery Manufacturing"
    },
    {
        "code": "33331",
        "description": "Commercial and Service Industry Machinery Manufacturing"
    },
    {
        "code": "333314",
        "description": "Optical Instrument and Lens Manufacturing"
    },
    {
        "code": "333316",
        "description": "Photographic and Photocopying Equipment Manufacturing"
    },
    {
        "code": "333318",
        "description": "Other Commercial and Service Industry Machinery Manufacturing"
    },
    {
        "code": "3334",
        "description": "Ventilation, Heating, Air-Conditioning, and Commercial Refrigeration Equipment Manufacturing"
    },
    {
        "code": "33341",
        "description": "Ventilation, Heating, Air-Conditioning, and Commercial Refrigeration Equipment Manufacturing"
    },
    {
        "code": "333413",
        "description": "Industrial and Commercial Fan and Blower and Air Purification Equipment Manufacturing"
    },
    {
        "code": "333414",
        "description": "Heating Equipment (except Warm Air Furnaces) Manufacturing"
    },
    {
        "code": "333415",
        "description": "Air-Conditioning and Warm Air Heating Equipment and Commercial and Industrial Refrigeration Equipment Manufacturing"
    },
    {
        "code": "3335",
        "description": "Metalworking Machinery Manufacturing"
    },
    {
        "code": "51111",
        "description": "Newspaper Publishers"
    },
    {
        "code": "33351",
        "description": "Metalworking Machinery Manufacturing"
    },
    {
        "code": "333511",
        "description": "Industrial Mold Manufacturing"
    },
    {
        "code": "44819",
        "description": "Other Clothing Stores"
    },
    {
        "code": "333514",
        "description": "Special Die and Tool, Die Set, Jig, and Fixture Manufacturing"
    },
    {
        "code": "333515",
        "description": "Cutting Tool and Machine Tool Accessory Manufacturing"
    },
    {
        "code": "333517",
        "description": "Machine Tool Manufacturing"
    },
    {
        "code": "333519",
        "description": "Rolling Mill and Other Metalworking Machinery Manufacturing"
    },
    {
        "code": "3336",
        "description": "Engine, Turbine, and Power Transmission Equipment Manufacturing"
    },
    {
        "code": "33361",
        "description": "Engine, Turbine, and Power Transmission Equipment Manufacturing"
    },
    {
        "code": "333611",
        "description": "Turbine and Turbine Generator Set Units Manufacturing"
    },
    {
        "code": "333612",
        "description": "Speed Changer, Industrial High-Speed Drive, and Gear Manufacturing"
    },
    {
        "code": "333613",
        "description": "Mechanical Power Transmission Equipment Manufacturing"
    },
    {
        "code": "333618",
        "description": "Other Engine Equipment Manufacturing"
    },
    {
        "code": "3339",
        "description": "Other General Purpose Machinery Manufacturing"
    },
    {
        "code": "33391",
        "description": "Pump and Compressor Manufacturing"
    },
    {
        "code": "333911",
        "description": "Pump and Pumping Equipment Manufacturing"
    },
    {
        "code": "333912",
        "description": "Air and Gas Compressor Manufacturing"
    },
    {
        "code": "333913",
        "description": "Measuring and Dispensing Pump Manufacturing"
    },
    {
        "code": "33392",
        "description": "Material Handling Equipment Manufacturing"
    },
    {
        "code": "333921",
        "description": "Elevator and Moving Stairway Manufacturing"
    },
    {
        "code": "333922",
        "description": "Conveyor and Conveying Equipment Manufacturing"
    },
    {
        "code": "333923",
        "description": "Overhead Traveling Crane, Hoist, and Monorail System Manufacturing"
    },
    {
        "code": "333924",
        "description": "Industrial Truck, Tractor, Trailer, and Stacker Machinery Manufacturing"
    },
    {
        "code": "33399",
        "description": "All Other General Purpose Machinery Manufacturing"
    },
    {
        "code": "333991",
        "description": "Power-Driven Handtool Manufacturing"
    },
    {
        "code": "333992",
        "description": "Welding and Soldering Equipment Manufacturing"
    },
    {
        "code": "333993",
        "description": "Packaging Machinery Manufacturing"
    },
    {
        "code": "333994",
        "description": "Industrial Process Furnace and Oven Manufacturing"
    },
    {
        "code": "333995",
        "description": "Fluid Power Cylinder and Actuator Manufacturing"
    },
    {
        "code": "333996",
        "description": "Fluid Power Pump and Motor Manufacturing"
    },
    {
        "code": "333997",
        "description": "Scale and Balance Manufacturing"
    },
    {
        "code": "333999",
        "description": "All Other Miscellaneous General Purpose Machinery Manufacturing"
    },
    {
        "code": "334",
        "description": "Computer and Electronic Product Manufacturing"
    },
    {
        "code": "3341",
        "description": "Computer and Peripheral Equipment Manufacturing"
    },
    {
        "code": "33411",
        "description": "Computer and Peripheral Equipment Manufacturing"
    },
    {
        "code": "334111",
        "description": "Electronic Computer Manufacturing"
    },
    {
        "code": "334112",
        "description": "Computer Storage Device Manufacturing"
    },
    {
        "code": "334118",
        "description": "Computer Terminal and Other Computer Peripheral Equipment Manufacturing"
    },
    {
        "code": "3342",
        "description": "Communications Equipment Manufacturing"
    },
    {
        "code": "33421",
        "description": "Telephone Apparatus Manufacturing"
    },
    {
        "code": "334210",
        "description": "Telephone Apparatus Manufacturing"
    },
    {
        "code": "33422",
        "description": "Radio and Television Broadcasting and Wireless Communications Equipment Manufacturing"
    },
    {
        "code": "334220",
        "description": "Radio and Television Broadcasting and Wireless Communications Equipment Manufacturing"
    },
    {
        "code": "33429",
        "description": "Other Communications Equipment Manufacturing"
    },
    {
        "code": "334290",
        "description": "Other Communications Equipment Manufacturing"
    },
    {
        "code": "3343",
        "description": "Audio and Video Equipment Manufacturing"
    },
    {
        "code": "33431",
        "description": "Audio and Video Equipment Manufacturing"
    },
    {
        "code": "334310",
        "description": "Audio and Video Equipment Manufacturing"
    },
    {
        "code": "3344",
        "description": "Semiconductor and Other Electronic Component Manufacturing"
    },
    {
        "code": "33441",
        "description": "Semiconductor and Other Electronic Component Manufacturing"
    },
    {
        "code": "334412",
        "description": "Bare Printed Circuit Board Manufacturing"
    },
    {
        "code": "334413",
        "description": "Semiconductor and Related Device Manufacturing"
    },
    {
        "code": "334416",
        "description": "Capacitor, Resistor, Coil, Transformer, and Other Inductor Manufacturing"
    },
    {
        "code": "334417",
        "description": "Electronic Connector Manufacturing"
    },
    {
        "code": "334418",
        "description": "Printed Circuit Assembly (Electronic Assembly) Manufacturing"
    },
    {
        "code": "334419",
        "description": "Other Electronic Component Manufacturing"
    },
    {
        "code": "3345",
        "description": "Navigational, Measuring, Electromedical, and Control Instruments Manufacturing"
    },
    {
        "code": "33451",
        "description": "Navigational, Measuring, Electromedical, and Control Instruments Manufacturing"
    },
    {
        "code": "334510",
        "description": "Electromedical and Electrotherapeutic Apparatus Manufacturing"
    },
    {
        "code": "334511",
        "description": "Search, Detection, Navigation, Guidance, Aeronautical, and Nautical System and Instrument Manufacturing"
    },
    {
        "code": "334512",
        "description": "Automatic Environmental Control Manufacturing for Residential, Commercial, and Appliance Use"
    },
    {
        "code": "334513",
        "description": "Instruments and Related Products Manufacturing for Measuring, Displaying, and Controlling Industrial Process Variables"
    },
    {
        "code": "334514",
        "description": "Totalizing Fluid Meter and Counting Device Manufacturing"
    },
    {
        "code": "334515",
        "description": "Instrument Manufacturing for Measuring and Testing Electricity and Electrical Signals"
    },
    {
        "code": "334516",
        "description": "Analytical Laboratory Instrument Manufacturing"
    },
    {
        "code": "334517",
        "description": "Irradiation Apparatus Manufacturing"
    },
    {
        "code": "334519",
        "description": "Other Measuring and Controlling Device Manufacturing"
    },
    {
        "code": "3346",
        "description": "Manufacturing and Reproducing Magnetic and Optical Media"
    },
    {
        "code": "33461",
        "description": "Manufacturing and Reproducing Magnetic and Optical Media"
    },
    {
        "code": "334613",
        "description": "Blank Magnetic and Optical Recording Media Manufacturing"
    },
    {
        "code": "334614",
        "description": "Software and Other Prerecorded Compact Disc, Tape, and Record Reproducing"
    },
    {
        "code": "335",
        "description": "Electrical Equipment, Appliance, and Component Manufacturing"
    },
    {
        "code": "3351",
        "description": "Electric Lighting Equipment Manufacturing"
    },
    {
        "code": "33511",
        "description": "Electric Lamp Bulb and Part Manufacturing"
    },
    {
        "code": "335110",
        "description": "Electric Lamp Bulb and Part Manufacturing"
    },
    {
        "code": "33512",
        "description": "Lighting Fixture Manufacturing"
    },
    {
        "code": "335121",
        "description": "Residential Electric Lighting Fixture Manufacturing"
    },
    {
        "code": "335122",
        "description": "Commercial, Industrial, and Institutional Electric Lighting Fixture Manufacturing"
    },
    {
        "code": "335129",
        "description": "Other Lighting Equipment Manufacturing"
    },
    {
        "code": "3352",
        "description": "Household Appliance Manufacturing"
    },
    {
        "code": "33521",
        "description": "Small Electrical Appliance Manufacturing"
    },
    {
        "code": "335210",
        "description": "Small Electrical Appliance Manufacturing"
    },
    {
        "code": "33522",
        "description": "Major Appliance Manufacturing"
    },
    {
        "code": "335221",
        "description": "Household Cooking Appliance Manufacturing"
    },
    {
        "code": "335222",
        "description": "Household Refrigerator and Home Freezer Manufacturing"
    },
    {
        "code": "335224",
        "description": "Household Laundry Equipment Manufacturing"
    },
    {
        "code": "335228",
        "description": "Other Major Household Appliance Manufacturing"
    },
    {
        "code": "3353",
        "description": "Electrical Equipment Manufacturing"
    },
    {
        "code": "33531",
        "description": "Electrical Equipment Manufacturing"
    },
    {
        "code": "335311",
        "description": "Power, Distribution, and Specialty Transformer Manufacturing"
    },
    {
        "code": "335312",
        "description": "Motor and Generator Manufacturing"
    },
    {
        "code": "335313",
        "description": "Switchgear and Switchboard Apparatus Manufacturing"
    },
    {
        "code": "335314",
        "description": "Relay and Industrial Control Manufacturing"
    },
    {
        "code": "3359",
        "description": "Other Electrical Equipment and Component Manufacturing"
    },
    {
        "code": "33591",
        "description": "Battery Manufacturing"
    },
    {
        "code": "335911",
        "description": "Storage Battery Manufacturing"
    },
    {
        "code": "335912",
        "description": "Primary Battery Manufacturing"
    },
    {
        "code": "33592",
        "description": "Communication and Energy Wire and Cable Manufacturing"
    },
    {
        "code": "335921",
        "description": "Fiber Optic Cable Manufacturing"
    },
    {
        "code": "335929",
        "description": "Other Communication and Energy Wire Manufacturing"
    },
    {
        "code": "33593",
        "description": "Wiring Device Manufacturing"
    },
    {
        "code": "335931",
        "description": "Current-Carrying Wiring Device Manufacturing"
    },
    {
        "code": "335932",
        "description": "Noncurrent-Carrying Wiring Device Manufacturing"
    },
    {
        "code": "33599",
        "description": "All Other Electrical Equipment and Component Manufacturing"
    },
    {
        "code": "335991",
        "description": "Carbon and Graphite Product Manufacturing"
    },
    {
        "code": "335999",
        "description": "All Other Miscellaneous Electrical Equipment and Component Manufacturing"
    },
    {
        "code": "336",
        "description": "Transportation Equipment Manufacturing"
    },
    {
        "code": "3361",
        "description": "Motor Vehicle Manufacturing"
    },
    {
        "code": "33611",
        "description": "Automobile and Light Duty Motor Vehicle Manufacturing"
    },
    {
        "code": "336111",
        "description": "Automobile Manufacturing"
    },
    {
        "code": "336112",
        "description": "Light Truck and Utility Vehicle Manufacturing"
    },
    {
        "code": "33612",
        "description": "Heavy Duty Truck Manufacturing"
    },
    {
        "code": "336120",
        "description": "Heavy Duty Truck Manufacturing"
    },
    {
        "code": "3362",
        "description": "Motor Vehicle Body and Trailer Manufacturing"
    },
    {
        "code": "33621",
        "description": "Motor Vehicle Body and Trailer Manufacturing"
    },
    {
        "code": "336211",
        "description": "Motor Vehicle Body Manufacturing"
    },
    {
        "code": "336212",
        "description": "Truck Trailer Manufacturing"
    },
    {
        "code": "336213",
        "description": "Motor Home Manufacturing"
    },
    {
        "code": "336214",
        "description": "Travel Trailer and Camper Manufacturing"
    },
    {
        "code": "3363",
        "description": "Motor Vehicle Parts Manufacturing"
    },
    {
        "code": "33631",
        "description": "Motor Vehicle Gasoline Engine and Engine Parts Manufacturing"
    },
    {
        "code": "336310",
        "description": "Motor Vehicle Gasoline Engine and Engine Parts Manufacturing"
    },
    {
        "code": "33632",
        "description": "Motor Vehicle Electrical and Electronic Equipment Manufacturing"
    },
    {
        "code": "336320",
        "description": "Motor Vehicle Electrical and Electronic Equipment Manufacturing"
    },
    {
        "code": "33633",
        "description": "Motor Vehicle Steering and Suspension Components (except Spring) Manufacturing"
    },
    {
        "code": "336330",
        "description": "Motor Vehicle Steering and Suspension Components (except Spring) Manufacturing"
    },
    {
        "code": "33634",
        "description": "Motor Vehicle Brake System Manufacturing"
    },
    {
        "code": "336340",
        "description": "Motor Vehicle Brake System Manufacturing"
    },
    {
        "code": "33635",
        "description": "Motor Vehicle Transmission and Power Train Parts Manufacturing"
    },
    {
        "code": "336350",
        "description": "Motor Vehicle Transmission and Power Train Parts Manufacturing"
    },
    {
        "code": "33636",
        "description": "Motor Vehicle Seating and Interior Trim Manufacturing"
    },
    {
        "code": "336360",
        "description": "Motor Vehicle Seating and Interior Trim Manufacturing"
    },
    {
        "code": "33637",
        "description": "Motor Vehicle Metal Stamping"
    },
    {
        "code": "336370",
        "description": "Motor Vehicle Metal Stamping"
    },
    {
        "code": "33639",
        "description": "Other Motor Vehicle Parts Manufacturing"
    },
    {
        "code": "336390",
        "description": "Other Motor Vehicle Parts Manufacturing"
    },
    {
        "code": "3364",
        "description": "Aerospace Product and Parts Manufacturing"
    },
    {
        "code": "33641",
        "description": "Aerospace Product and Parts Manufacturing"
    },
    {
        "code": "336411",
        "description": "Aircraft Manufacturing"
    },
    {
        "code": "336412",
        "description": "Aircraft Engine and Engine Parts Manufacturing"
    },
    {
        "code": "336413",
        "description": "Other Aircraft Parts and Auxiliary Equipment Manufacturing"
    },
    {
        "code": "336414",
        "description": "Guided Missile and Space Vehicle Manufacturing"
    },
    {
        "code": "336415",
        "description": "Guided Missile and Space Vehicle Propulsion Unit and Propulsion Unit Parts Manufacturing"
    },
    {
        "code": "336419",
        "description": "Other Guided Missile and Space Vehicle Parts and Auxiliary Equipment Manufacturing"
    },
    {
        "code": "3365",
        "description": "Railroad Rolling Stock Manufacturing"
    },
    {
        "code": "33651",
        "description": "Railroad Rolling Stock Manufacturing"
    },
    {
        "code": "336510",
        "description": "Railroad Rolling Stock Manufacturing"
    },
    {
        "code": "3366",
        "description": "Ship and Boat Building"
    },
    {
        "code": "33661",
        "description": "Ship and Boat Building"
    },
    {
        "code": "336611",
        "description": "Ship Building and Repairing"
    },
    {
        "code": "336612",
        "description": "Boat Building"
    },
    {
        "code": "3369",
        "description": "Other Transportation Equipment Manufacturing"
    },
    {
        "code": "33699",
        "description": "Other Transportation Equipment Manufacturing"
    },
    {
        "code": "336991",
        "description": "Motorcycle, Bicycle, and Parts Manufacturing"
    },
    {
        "code": "336992",
        "description": "Military Armored Vehicle, Tank, and Tank Component Manufacturing"
    },
    {
        "code": "336999",
        "description": "All Other Transportation Equipment Manufacturing"
    },
    {
        "code": "337",
        "description": "Furniture and Related Product Manufacturing"
    },
    {
        "code": "3371",
        "description": "Household and Institutional Furniture and Kitchen Cabinet Manufacturing"
    },
    {
        "code": "33711",
        "description": "Wood Kitchen Cabinet and Countertop Manufacturing"
    },
    {
        "code": "337110",
        "description": "Wood Kitchen Cabinet and Countertop Manufacturing"
    },
    {
        "code": "33712",
        "description": "Household and Institutional Furniture Manufacturing"
    },
    {
        "code": "337121",
        "description": "Upholstered Household Furniture Manufacturing"
    },
    {
        "code": "337122",
        "description": "Nonupholstered Wood Household Furniture Manufacturing"
    },
    {
        "code": "337124",
        "description": "Metal Household Furniture Manufacturing"
    },
    {
        "code": "337125",
        "description": "Household Furniture (except Wood and Metal) Manufacturing"
    },
    {
        "code": "337127",
        "description": "Institutional Furniture Manufacturing"
    },
    {
        "code": "3372",
        "description": "Office Furniture (including Fixtures) Manufacturing"
    },
    {
        "code": "33721",
        "description": "Office Furniture (including Fixtures) Manufacturing"
    },
    {
        "code": "337211",
        "description": "Wood Office Furniture Manufacturing"
    },
    {
        "code": "337212",
        "description": "Custom Architectural Woodwork and Millwork Manufacturing"
    },
    {
        "code": "337214",
        "description": "Office Furniture (except Wood) Manufacturing"
    },
    {
        "code": "337215",
        "description": "Showcase, Partition, Shelving, and Locker Manufacturing"
    },
    {
        "code": "3379",
        "description": "Other Furniture Related Product Manufacturing"
    },
    {
        "code": "33791",
        "description": "Mattress Manufacturing"
    },
    {
        "code": "337910",
        "description": "Mattress Manufacturing"
    },
    {
        "code": "33792",
        "description": "Blind and Shade Manufacturing"
    },
    {
        "code": "337920",
        "description": "Blind and Shade Manufacturing"
    },
    {
        "code": "339",
        "description": "Miscellaneous Manufacturing"
    },
    {
        "code": "3391",
        "description": "Medical Equipment and Supplies Manufacturing"
    },
    {
        "code": "33911",
        "description": "Medical Equipment and Supplies Manufacturing"
    },
    {
        "code": "339112",
        "description": "Surgical and Medical Instrument Manufacturing"
    },
    {
        "code": "51112",
        "description": "Periodical Publishers"
    },
    {
        "code": "339113",
        "description": "Surgical Appliance and Supplies Manufacturing"
    },
    {
        "code": "339114",
        "description": "Dental Equipment and Supplies Manufacturing"
    },
    {
        "code": "339115",
        "description": "Ophthalmic Goods Manufacturing"
    },
    {
        "code": "3399",
        "description": "Other Miscellaneous Manufacturing"
    },
    {
        "code": "33991",
        "description": "Jewelry and Silverware Manufacturing"
    },
    {
        "code": "339910",
        "description": "Jewelry and Silverware Manufacturing"
    },
    {
        "code": "33992",
        "description": "Sporting and Athletic Goods Manufacturing"
    },
    {
        "code": "339920",
        "description": "Sporting and Athletic Goods Manufacturing"
    },
    {
        "code": "33993",
        "description": "Doll, Toy, and Game Manufacturing"
    },
    {
        "code": "339930",
        "description": "Doll, Toy, and Game Manufacturing"
    },
    {
        "code": "33994",
        "description": "Office Supplies (except Paper) Manufacturing"
    },
    {
        "code": "339940",
        "description": "Office Supplies (except Paper) Manufacturing"
    },
    {
        "code": "33995",
        "description": "Sign Manufacturing"
    },
    {
        "code": "339950",
        "description": "Sign Manufacturing"
    },
    {
        "code": "33999",
        "description": "All Other Miscellaneous Manufacturing"
    },
    {
        "code": "339991",
        "description": "Gasket, Packing, and Sealing Device Manufacturing"
    },
    {
        "code": "339992",
        "description": "Musical Instrument Manufacturing"
    },
    {
        "code": "339993",
        "description": "Fastener, Button, Needle, and Pin Manufacturing"
    },
    {
        "code": "339994",
        "description": "Broom, Brush, and Mop Manufacturing"
    },
    {
        "code": "339995",
        "description": "Burial Casket Manufacturing"
    },
    {
        "code": "339999",
        "description": "All Other Miscellaneous Manufacturing"
    },
    {
        "code": "42",
        "description": "Wholesale Trade"
    },
    {
        "code": "423",
        "description": "Merchant Wholesalers, Durable Goods"
    },
    {
        "code": "4231",
        "description": "Motor Vehicle and Motor Vehicle Parts and Supplies Merchant Wholesalers"
    },
    {
        "code": "42311",
        "description": "Automobile and Other Motor Vehicle Merchant Wholesalers"
    },
    {
        "code": "423110",
        "description": "Automobile and Other Motor Vehicle Merchant Wholesalers"
    },
    {
        "code": "42312",
        "description": "Motor Vehicle Supplies and New Parts Merchant Wholesalers"
    },
    {
        "code": "423120",
        "description": "Motor Vehicle Supplies and New Parts Merchant Wholesalers"
    },
    {
        "code": "42313",
        "description": "Tire and Tube Merchant Wholesalers"
    },
    {
        "code": "423130",
        "description": "Tire and Tube Merchant Wholesalers"
    },
    {
        "code": "42314",
        "description": "Motor Vehicle Parts (Used) Merchant Wholesalers"
    },
    {
        "code": "423140",
        "description": "Motor Vehicle Parts (Used) Merchant Wholesalers"
    },
    {
        "code": "4232",
        "description": "Furniture and Home Furnishing Merchant Wholesalers"
    },
    {
        "code": "42321",
        "description": "Furniture Merchant Wholesalers"
    },
    {
        "code": "423210",
        "description": "Furniture Merchant Wholesalers"
    },
    {
        "code": "42322",
        "description": "Home Furnishing Merchant Wholesalers"
    },
    {
        "code": "423220",
        "description": "Home Furnishing Merchant Wholesalers"
    },
    {
        "code": "4233",
        "description": "Lumber and Other Construction Materials Merchant Wholesalers"
    },
    {
        "code": "42331",
        "description": "Lumber, Plywood, Millwork, and Wood Panel Merchant Wholesalers"
    },
    {
        "code": "423310",
        "description": "Lumber, Plywood, Millwork, and Wood Panel Merchant Wholesalers"
    },
    {
        "code": "42332",
        "description": "Brick, Stone, and Related Construction Material Merchant Wholesalers"
    },
    {
        "code": "423320",
        "description": "Brick, Stone, and Related Construction Material Merchant Wholesalers"
    },
    {
        "code": "42333",
        "description": "Roofing, Siding, and Insulation Material Merchant Wholesalers"
    },
    {
        "code": "423330",
        "description": "Roofing, Siding, and Insulation Material Merchant Wholesalers"
    },
    {
        "code": "42339",
        "description": "Other Construction Material Merchant Wholesalers"
    },
    {
        "code": "423390",
        "description": "Other Construction Material Merchant Wholesalers"
    },
    {
        "code": "4234",
        "description": "Professional and Commercial Equipment and Supplies Merchant Wholesalers"
    },
    {
        "code": "42341",
        "description": "Photographic Equipment and Supplies Merchant Wholesalers"
    },
    {
        "code": "423410",
        "description": "Photographic Equipment and Supplies Merchant Wholesalers"
    },
    {
        "code": "42342",
        "description": "Office Equipment Merchant Wholesalers"
    },
    {
        "code": "423420",
        "description": "Office Equipment Merchant Wholesalers"
    },
    {
        "code": "42343",
        "description": "Computer and Computer Peripheral Equipment and Software Merchant Wholesalers"
    },
    {
        "code": "423430",
        "description": "Computer and Computer Peripheral Equipment and Software Merchant Wholesalers"
    },
    {
        "code": "42344",
        "description": "Other Commercial Equipment Merchant Wholesalers"
    },
    {
        "code": "423440",
        "description": "Other Commercial Equipment Merchant Wholesalers"
    },
    {
        "code": "42345",
        "description": "Medical, Dental, and Hospital Equipment and Supplies Merchant Wholesalers"
    },
    {
        "code": "423450",
        "description": "Medical, Dental, and Hospital Equipment and Supplies Merchant Wholesalers"
    },
    {
        "code": "42346",
        "description": "Ophthalmic Goods Merchant Wholesalers"
    },
    {
        "code": "423460",
        "description": "Ophthalmic Goods Merchant Wholesalers"
    },
    {
        "code": "42349",
        "description": "Other Professional Equipment and Supplies Merchant Wholesalers"
    },
    {
        "code": "423490",
        "description": "Other Professional Equipment and Supplies Merchant Wholesalers"
    },
    {
        "code": "4235",
        "description": "Metal and Mineral (except Petroleum) Merchant Wholesalers"
    },
    {
        "code": "42351",
        "description": "Metal Service Centers and Other Metal Merchant Wholesalers"
    },
    {
        "code": "423510",
        "description": "Metal Service Centers and Other Metal Merchant Wholesalers"
    },
    {
        "code": "42352",
        "description": "Coal and Other Mineral and Ore Merchant Wholesalers"
    },
    {
        "code": "423520",
        "description": "Coal and Other Mineral and Ore Merchant Wholesalers"
    },
    {
        "code": "4236",
        "description": "Household Appliances and Electrical and Electronic Goods Merchant Wholesalers"
    },
    {
        "code": "42361",
        "description": "Electrical Apparatus and Equipment, Wiring Supplies, and Related Equipment Merchant Wholesalers"
    },
    {
        "code": "423610",
        "description": "Electrical Apparatus and Equipment, Wiring Supplies, and Related Equipment Merchant Wholesalers"
    },
    {
        "code": "42362",
        "description": "Household Appliances, Electric Housewares, and Consumer Electronics Merchant Wholesalers"
    },
    {
        "code": "423620",
        "description": "Household Appliances, Electric Housewares, and Consumer Electronics Merchant Wholesalers"
    },
    {
        "code": "42369",
        "description": "Other Electronic Parts and Equipment Merchant Wholesalers"
    },
    {
        "code": "423690",
        "description": "Other Electronic Parts and Equipment Merchant Wholesalers"
    },
    {
        "code": "4237",
        "description": "Hardware, and Plumbing and Heating Equipment and Supplies Merchant Wholesalers"
    },
    {
        "code": "42371",
        "description": "Hardware Merchant Wholesalers"
    },
    {
        "code": "423710",
        "description": "Hardware Merchant Wholesalers"
    },
    {
        "code": "42372",
        "description": "Plumbing and Heating Equipment and Supplies (Hydronics) Merchant Wholesalers"
    },
    {
        "code": "423720",
        "description": "Plumbing and Heating Equipment and Supplies (Hydronics) Merchant Wholesalers"
    },
    {
        "code": "42373",
        "description": "Warm Air Heating and Air-Conditioning Equipment and Supplies Merchant Wholesalers"
    },
    {
        "code": "423730",
        "description": "Warm Air Heating and Air-Conditioning Equipment and Supplies Merchant Wholesalers"
    },
    {
        "code": "42374",
        "description": "Refrigeration Equipment and Supplies Merchant Wholesalers"
    },
    {
        "code": "423740",
        "description": "Refrigeration Equipment and Supplies Merchant Wholesalers"
    },
    {
        "code": "4238",
        "description": "Machinery, Equipment, and Supplies Merchant Wholesalers"
    },
    {
        "code": "42381",
        "description": "Construction and Mining (except Oil Well) Machinery and Equipment Merchant Wholesalers"
    },
    {
        "code": "423810",
        "description": "Construction and Mining (except Oil Well) Machinery and Equipment Merchant Wholesalers"
    },
    {
        "code": "42382",
        "description": "Farm and Garden Machinery and Equipment Merchant Wholesalers"
    },
    {
        "code": "423820",
        "description": "Farm and Garden Machinery and Equipment Merchant Wholesalers"
    },
    {
        "code": "42383",
        "description": "Industrial Machinery and Equipment Merchant Wholesalers"
    },
    {
        "code": "423830",
        "description": "Industrial Machinery and Equipment Merchant Wholesalers"
    },
    {
        "code": "42384",
        "description": "Industrial Supplies Merchant Wholesalers"
    },
    {
        "code": "423840",
        "description": "Industrial Supplies Merchant Wholesalers"
    },
    {
        "code": "42385",
        "description": "Service Establishment Equipment and Supplies Merchant Wholesalers"
    },
    {
        "code": "423850",
        "description": "Service Establishment Equipment and Supplies Merchant Wholesalers"
    },
    {
        "code": "42386",
        "description": "Transportation Equipment and Supplies (except Motor Vehicle) Merchant Wholesalers"
    },
    {
        "code": "423860",
        "description": "Transportation Equipment and Supplies (except Motor Vehicle) Merchant Wholesalers"
    },
    {
        "code": "4239",
        "description": "Miscellaneous Durable Goods Merchant Wholesalers"
    },
    {
        "code": "42391",
        "description": "Sporting and Recreational Goods and Supplies Merchant Wholesalers"
    },
    {
        "code": "423910",
        "description": "Sporting and Recreational Goods and Supplies Merchant Wholesalers"
    },
    {
        "code": "42392",
        "description": "Toy and Hobby Goods and Supplies Merchant Wholesalers"
    },
    {
        "code": "423920",
        "description": "Toy and Hobby Goods and Supplies Merchant Wholesalers"
    },
    {
        "code": "42393",
        "description": "Recyclable Material Merchant Wholesalers"
    },
    {
        "code": "423930",
        "description": "Recyclable Material Merchant Wholesalers"
    },
    {
        "code": "42394",
        "description": "Jewelry, Watch, Precious Stone, and Precious Metal Merchant Wholesalers"
    },
    {
        "code": "423940",
        "description": "Jewelry, Watch, Precious Stone, and Precious Metal Merchant Wholesalers"
    },
    {
        "code": "42399",
        "description": "Other Miscellaneous Durable Goods Merchant Wholesalers"
    },
    {
        "code": "423990",
        "description": "Other Miscellaneous Durable Goods Merchant Wholesalers"
    },
    {
        "code": "424",
        "description": "Merchant Wholesalers, Nondurable Goods"
    },
    {
        "code": "4241",
        "description": "Paper and Paper Product Merchant Wholesalers"
    },
    {
        "code": "515120",
        "description": "Television Broadcasting"
    },
    {
        "code": "42411",
        "description": "Printing and Writing Paper Merchant Wholesalers"
    },
    {
        "code": "424110",
        "description": "Printing and Writing Paper Merchant Wholesalers"
    },
    {
        "code": "42412",
        "description": "Stationery and Office Supplies Merchant Wholesalers"
    },
    {
        "code": "424120",
        "description": "Stationery and Office Supplies Merchant Wholesalers"
    },
    {
        "code": "42413",
        "description": "Industrial and Personal Service Paper Merchant Wholesalers"
    },
    {
        "code": "424130",
        "description": "Industrial and Personal Service Paper Merchant Wholesalers"
    },
    {
        "code": "4242",
        "description": "Drugs and Druggists' Sundries Merchant Wholesalers"
    },
    {
        "code": "42421",
        "description": "Drugs and Druggists' Sundries Merchant Wholesalers"
    },
    {
        "code": "424210",
        "description": "Drugs and Druggists' Sundries Merchant Wholesalers"
    },
    {
        "code": "4243",
        "description": "Apparel, Piece Goods, and Notions Merchant Wholesalers"
    },
    {
        "code": "42431",
        "description": "Piece Goods, Notions, and Other Dry Goods Merchant Wholesalers"
    },
    {
        "code": "424310",
        "description": "Piece Goods, Notions, and Other Dry Goods Merchant Wholesalers"
    },
    {
        "code": "42432",
        "description": "Men's and Boys' Clothing and Furnishings Merchant Wholesalers"
    },
    {
        "code": "424320",
        "description": "Men's and Boys' Clothing and Furnishings Merchant Wholesalers"
    },
    {
        "code": "42433",
        "description": "Women's, Children's, and Infants' Clothing and Accessories Merchant Wholesalers"
    },
    {
        "code": "424330",
        "description": "Women's, Children's, and Infants' Clothing and Accessories Merchant Wholesalers"
    },
    {
        "code": "42434",
        "description": "Footwear Merchant Wholesalers"
    },
    {
        "code": "424340",
        "description": "Footwear Merchant Wholesalers"
    },
    {
        "code": "4244",
        "description": "Grocery and Related Product Merchant Wholesalers"
    },
    {
        "code": "42441",
        "description": "General Line Grocery Merchant Wholesalers"
    },
    {
        "code": "424410",
        "description": "General Line Grocery Merchant Wholesalers"
    },
    {
        "code": "42442",
        "description": "Packaged Frozen Food Merchant Wholesalers"
    },
    {
        "code": "424420",
        "description": "Packaged Frozen Food Merchant Wholesalers"
    },
    {
        "code": "42443",
        "description": "Dairy Product (except Dried or Canned) Merchant Wholesalers"
    },
    {
        "code": "424430",
        "description": "Dairy Product (except Dried or Canned) Merchant Wholesalers"
    },
    {
        "code": "42444",
        "description": "Poultry and Poultry Product Merchant Wholesalers"
    },
    {
        "code": "424440",
        "description": "Poultry and Poultry Product Merchant Wholesalers"
    },
    {
        "code": "42445",
        "description": "Confectionery Merchant Wholesalers"
    },
    {
        "code": "424450",
        "description": "Confectionery Merchant Wholesalers"
    },
    {
        "code": "42446",
        "description": "Fish and Seafood Merchant Wholesalers"
    },
    {
        "code": "424460",
        "description": "Fish and Seafood Merchant Wholesalers"
    },
    {
        "code": "42447",
        "description": "Meat and Meat Product Merchant Wholesalers"
    },
    {
        "code": "424470",
        "description": "Meat and Meat Product Merchant Wholesalers"
    },
    {
        "code": "42448",
        "description": "Fresh Fruit and Vegetable Merchant Wholesalers"
    },
    {
        "code": "424480",
        "description": "Fresh Fruit and Vegetable Merchant Wholesalers"
    },
    {
        "code": "42449",
        "description": "Other Grocery and Related Products Merchant Wholesalers"
    },
    {
        "code": "424490",
        "description": "Other Grocery and Related Products Merchant Wholesalers"
    },
    {
        "code": "4245",
        "description": "Farm Product Raw Material Merchant Wholesalers"
    },
    {
        "code": "42451",
        "description": "Grain and Field Bean Merchant Wholesalers"
    },
    {
        "code": "424510",
        "description": "Grain and Field Bean Merchant Wholesalers"
    },
    {
        "code": "42452",
        "description": "Livestock Merchant Wholesalers"
    },
    {
        "code": "424520",
        "description": "Livestock Merchant Wholesalers"
    },
    {
        "code": "42459",
        "description": "Other Farm Product Raw Material Merchant Wholesalers"
    },
    {
        "code": "424590",
        "description": "Other Farm Product Raw Material Merchant Wholesalers"
    },
    {
        "code": "4246",
        "description": "Chemical and Allied Products Merchant Wholesalers"
    },
    {
        "code": "42461",
        "description": "Plastics Materials and Basic Forms and Shapes Merchant Wholesalers"
    },
    {
        "code": "424610",
        "description": "Plastics Materials and Basic Forms and Shapes Merchant Wholesalers"
    },
    {
        "code": "42469",
        "description": "Other Chemical and Allied Products Merchant Wholesalers"
    },
    {
        "code": "424690",
        "description": "Other Chemical and Allied Products Merchant Wholesalers"
    },
    {
        "code": "4247",
        "description": "Petroleum and Petroleum Products Merchant Wholesalers"
    },
    {
        "code": "42471",
        "description": "Petroleum Bulk Stations and Terminals"
    },
    {
        "code": "424710",
        "description": "Petroleum Bulk Stations and Terminals"
    },
    {
        "code": "42472",
        "description": "Petroleum and Petroleum Products Merchant Wholesalers (except Bulk Stations and Terminals)"
    },
    {
        "code": "424720",
        "description": "Petroleum and Petroleum Products Merchant Wholesalers (except Bulk Stations and Terminals)"
    },
    {
        "code": "4248",
        "description": "Beer, Wine, and Distilled Alcoholic Beverage Merchant Wholesalers"
    },
    {
        "code": "42481",
        "description": "Beer and Ale Merchant Wholesalers"
    },
    {
        "code": "424810",
        "description": "Beer and Ale Merchant Wholesalers"
    },
    {
        "code": "42482",
        "description": "Wine and Distilled Alcoholic Beverage Merchant Wholesalers"
    },
    {
        "code": "424820",
        "description": "Wine and Distilled Alcoholic Beverage Merchant Wholesalers"
    },
    {
        "code": "4249",
        "description": "Miscellaneous Nondurable Goods Merchant Wholesalers"
    },
    {
        "code": "42491",
        "description": "Farm Supplies Merchant Wholesalers"
    },
    {
        "code": "424910",
        "description": "Farm Supplies Merchant Wholesalers"
    },
    {
        "code": "42492",
        "description": "Book, Periodical, and Newspaper Merchant Wholesalers"
    },
    {
        "code": "448190",
        "description": "Other Clothing Stores"
    },
    {
        "code": "424920",
        "description": "Book, Periodical, and Newspaper Merchant Wholesalers"
    },
    {
        "code": "42493",
        "description": "Flower, Nursery Stock, and Florists' Supplies Merchant Wholesalers"
    },
    {
        "code": "424930",
        "description": "Flower, Nursery Stock, and Florists' Supplies Merchant Wholesalers"
    },
    {
        "code": "42494",
        "description": "Tobacco and Tobacco Product Merchant Wholesalers"
    },
    {
        "code": "424940",
        "description": "Tobacco and Tobacco Product Merchant Wholesalers"
    },
    {
        "code": "42495",
        "description": "Paint, Varnish, and Supplies Merchant Wholesalers"
    },
    {
        "code": "424950",
        "description": "Paint, Varnish, and Supplies Merchant Wholesalers"
    },
    {
        "code": "42499",
        "description": "Other Miscellaneous Nondurable Goods Merchant Wholesalers"
    },
    {
        "code": "424990",
        "description": "Other Miscellaneous Nondurable Goods Merchant Wholesalers"
    },
    {
        "code": "425",
        "description": "Wholesale Electronic Markets and Agents and Brokers"
    },
    {
        "code": "4251",
        "description": "Wholesale Electronic Markets and Agents and Brokers"
    },
    {
        "code": "42511",
        "description": "Business to Business Electronic Markets"
    },
    {
        "code": "425110",
        "description": "Business to Business Electronic Markets"
    },
    {
        "code": "42512",
        "description": "Wholesale Trade Agents and Brokers"
    },
    {
        "code": "425120",
        "description": "Wholesale Trade Agents and Brokers"
    },
    {
        "code": "441",
        "description": "Motor Vehicle and Parts Dealers"
    },
    {
        "code": "4411",
        "description": "Automobile Dealers"
    },
    {
        "code": "44111",
        "description": "New Car Dealers"
    },
    {
        "code": "441110",
        "description": "New Car Dealers"
    },
    {
        "code": "44112",
        "description": "Used Car Dealers"
    },
    {
        "code": "441120",
        "description": "Used Car Dealers"
    },
    {
        "code": "4412",
        "description": "Other Motor Vehicle Dealers"
    },
    {
        "code": "44121",
        "description": "Recreational Vehicle Dealers"
    },
    {
        "code": "441210",
        "description": "Recreational Vehicle Dealers"
    },
    {
        "code": "44122",
        "description": "Motorcycle, Boat, and Other Motor Vehicle Dealers"
    },
    {
        "code": "441222",
        "description": "Boat Dealers"
    },
    {
        "code": "441228",
        "description": "Motorcycle, ATV, and All Other Motor Vehicle Dealers"
    },
    {
        "code": "4413",
        "description": "Automotive Parts, Accessories, and Tire Stores"
    },
    {
        "code": "44131",
        "description": "Automotive Parts and Accessories Stores"
    },
    {
        "code": "441310",
        "description": "Automotive Parts and Accessories Stores"
    },
    {
        "code": "44132",
        "description": "Tire Dealers"
    },
    {
        "code": "441320",
        "description": "Tire Dealers"
    },
    {
        "code": "442",
        "description": "Furniture and Home Furnishings Stores"
    },
    {
        "code": "4421",
        "description": "Furniture Stores"
    },
    {
        "code": "44211",
        "description": "Furniture Stores"
    },
    {
        "code": "442110",
        "description": "Furniture Stores"
    },
    {
        "code": "4422",
        "description": "Home Furnishings Stores"
    },
    {
        "code": "44221",
        "description": "Floor Covering Stores"
    },
    {
        "code": "442210",
        "description": "Floor Covering Stores"
    },
    {
        "code": "44229",
        "description": "Other Home Furnishings Stores"
    },
    {
        "code": "442291",
        "description": "Window Treatment Stores"
    },
    {
        "code": "442299",
        "description": "All Other Home Furnishings Stores"
    },
    {
        "code": "443",
        "description": "Electronics and Appliance Stores"
    },
    {
        "code": "4431",
        "description": "Electronics and Appliance Stores"
    },
    {
        "code": "44314",
        "description": "Electronics and Appliance Stores"
    },
    {
        "code": "443141",
        "description": "Household Appliance Stores"
    },
    {
        "code": "443142",
        "description": "Electronics Stores"
    },
    {
        "code": "444",
        "description": "Building Material and Garden Equipment and Supplies Dealers"
    },
    {
        "code": "4441",
        "description": "Building Material and Supplies Dealers"
    },
    {
        "code": "44411",
        "description": "Home Centers"
    },
    {
        "code": "444110",
        "description": "Home Centers"
    },
    {
        "code": "44412",
        "description": "Paint and Wallpaper Stores"
    },
    {
        "code": "444120",
        "description": "Paint and Wallpaper Stores"
    },
    {
        "code": "44413",
        "description": "Hardware Stores"
    },
    {
        "code": "444130",
        "description": "Hardware Stores"
    },
    {
        "code": "44419",
        "description": "Other Building Material Dealers"
    },
    {
        "code": "444190",
        "description": "Other Building Material Dealers"
    },
    {
        "code": "4442",
        "description": "Lawn and Garden Equipment and Supplies Stores"
    },
    {
        "code": "44421",
        "description": "Outdoor Power Equipment Stores"
    },
    {
        "code": "444210",
        "description": "Outdoor Power Equipment Stores"
    },
    {
        "code": "44422",
        "description": "Nursery, Garden Center, and Farm Supply Stores"
    },
    {
        "code": "444220",
        "description": "Nursery, Garden Center, and Farm Supply Stores"
    },
    {
        "code": "445",
        "description": "Food and Beverage Stores"
    },
    {
        "code": "4451",
        "description": "Grocery Stores"
    },
    {
        "code": "44511",
        "description": "Supermarkets and Other Grocery (except Convenience) Stores"
    },
    {
        "code": "445110",
        "description": "Supermarkets and Other Grocery (except Convenience) Stores"
    },
    {
        "code": "44512",
        "description": "Convenience Stores"
    },
    {
        "code": "445120",
        "description": "Convenience Stores"
    },
    {
        "code": "4452",
        "description": "Specialty Food Stores"
    },
    {
        "code": "44521",
        "description": "Meat Markets"
    },
    {
        "code": "445210",
        "description": "Meat Markets"
    },
    {
        "code": "44522",
        "description": "Fish and Seafood Markets"
    },
    {
        "code": "445220",
        "description": "Fish and Seafood Markets"
    },
    {
        "code": "44523",
        "description": "Fruit and Vegetable Markets"
    },
    {
        "code": "445230",
        "description": "Fruit and Vegetable Markets"
    },
    {
        "code": "44529",
        "description": "Other Specialty Food Stores"
    },
    {
        "code": "445291",
        "description": "Baked Goods Stores"
    },
    {
        "code": "445292",
        "description": "Confectionery and Nut Stores"
    },
    {
        "code": "445299",
        "description": "All Other Specialty Food Stores"
    },
    {
        "code": "4453",
        "description": "Beer, Wine, and Liquor Stores"
    },
    {
        "code": "44531",
        "description": "Beer, Wine, and Liquor Stores"
    },
    {
        "code": "445310",
        "description": "Beer, Wine, and Liquor Stores"
    },
    {
        "code": "446",
        "description": "Health and Personal Care Stores"
    },
    {
        "code": "4461",
        "description": "Health and Personal Care Stores"
    },
    {
        "code": "44611",
        "description": "Pharmacies and Drug Stores"
    },
    {
        "code": "446110",
        "description": "Pharmacies and Drug Stores"
    },
    {
        "code": "44612",
        "description": "Cosmetics, Beauty Supplies, and Perfume Stores"
    },
    {
        "code": "446120",
        "description": "Cosmetics, Beauty Supplies, and Perfume Stores"
    },
    {
        "code": "44613",
        "description": "Optical Goods Stores"
    },
    {
        "code": "446130",
        "description": "Optical Goods Stores"
    },
    {
        "code": "44619",
        "description": "Other Health and Personal Care Stores"
    },
    {
        "code": "446191",
        "description": "Food (Health) Supplement Stores"
    },
    {
        "code": "446199",
        "description": "All Other Health and Personal Care Stores"
    },
    {
        "code": "447",
        "description": "Gasoline Stations"
    },
    {
        "code": "4471",
        "description": "Gasoline Stations"
    },
    {
        "code": "44711",
        "description": "Gasoline Stations with Convenience Stores"
    },
    {
        "code": "447110",
        "description": "Gasoline Stations with Convenience Stores"
    },
    {
        "code": "44719",
        "description": "Other Gasoline Stations"
    },
    {
        "code": "447190",
        "description": "Other Gasoline Stations"
    },
    {
        "code": "448",
        "description": "Clothing and Clothing Accessories Stores"
    },
    {
        "code": "4481",
        "description": "Clothing Stores"
    },
    {
        "code": "44811",
        "description": "Men's Clothing Stores"
    },
    {
        "code": "448110",
        "description": "Men's Clothing Stores"
    },
    {
        "code": "44812",
        "description": "Women's Clothing Stores"
    },
    {
        "code": "448120",
        "description": "Women's Clothing Stores"
    },
    {
        "code": "44813",
        "description": "Children's and Infants' Clothing Stores"
    },
    {
        "code": "448130",
        "description": "Children's and Infants' Clothing Stores"
    },
    {
        "code": "44814",
        "description": "Family Clothing Stores"
    },
    {
        "code": "448140",
        "description": "Family Clothing Stores"
    },
    {
        "code": "44815",
        "description": "Clothing Accessories Stores"
    },
    {
        "code": "448150",
        "description": "Clothing Accessories Stores"
    },
    {
        "code": "4482",
        "description": "Shoe Stores"
    },
    {
        "code": "44821",
        "description": "Shoe Stores"
    },
    {
        "code": "448210",
        "description": "Shoe Stores"
    },
    {
        "code": "4483",
        "description": "Jewelry, Luggage, and Leather Goods Stores"
    },
    {
        "code": "44831",
        "description": "Jewelry Stores"
    },
    {
        "code": "448310",
        "description": "Jewelry Stores"
    },
    {
        "code": "44832",
        "description": "Luggage and Leather Goods Stores"
    },
    {
        "code": "448320",
        "description": "Luggage and Leather Goods Stores"
    },
    {
        "code": "451",
        "description": "Sporting Goods, Hobby, Musical Instrument, and Book Stores"
    },
    {
        "code": "4511",
        "description": "Sporting Goods, Hobby, and Musical Instrument Stores"
    },
    {
        "code": "45111",
        "description": "Sporting Goods Stores"
    },
    {
        "code": "451110",
        "description": "Sporting Goods Stores"
    },
    {
        "code": "45112",
        "description": "Hobby, Toy, and Game Stores"
    },
    {
        "code": "451120",
        "description": "Hobby, Toy, and Game Stores"
    },
    {
        "code": "45113",
        "description": "Sewing, Needlework, and Piece Goods Stores"
    },
    {
        "code": "451130",
        "description": "Sewing, Needlework, and Piece Goods Stores"
    },
    {
        "code": "45114",
        "description": "Musical Instrument and Supplies Stores"
    },
    {
        "code": "451140",
        "description": "Musical Instrument and Supplies Stores"
    },
    {
        "code": "4512",
        "description": "Book Stores and News Dealers"
    },
    {
        "code": "45121",
        "description": "Book Stores and News Dealers"
    },
    {
        "code": "451211",
        "description": "Book Stores"
    },
    {
        "code": "451212",
        "description": "News Dealers and Newsstands"
    },
    {
        "code": "452",
        "description": "General Merchandise Stores"
    },
    {
        "code": "4521",
        "description": "Department Stores"
    },
    {
        "code": "45211",
        "description": "Department Stores"
    },
    {
        "code": "452111",
        "description": "Department Stores (except Discount Department Stores)"
    },
    {
        "code": "452112",
        "description": "Discount Department Stores"
    },
    {
        "code": "4529",
        "description": "Other General Merchandise Stores"
    },
    {
        "code": "45291",
        "description": "Warehouse Clubs and Supercenters"
    },
    {
        "code": "452910",
        "description": "Warehouse Clubs and Supercenters"
    },
    {
        "code": "45299",
        "description": "All Other General Merchandise Stores"
    },
    {
        "code": "452990",
        "description": "All Other General Merchandise Stores"
    },
    {
        "code": "453",
        "description": "Miscellaneous Store Retailers"
    },
    {
        "code": "4531",
        "description": "Florists"
    },
    {
        "code": "45311",
        "description": "Florists"
    },
    {
        "code": "453110",
        "description": "Florists"
    },
    {
        "code": "4532",
        "description": "Office Supplies, Stationery, and Gift Stores"
    },
    {
        "code": "45321",
        "description": "Office Supplies and Stationery Stores"
    },
    {
        "code": "453210",
        "description": "Office Supplies and Stationery Stores"
    },
    {
        "code": "45322",
        "description": "Gift, Novelty, and Souvenir Stores"
    },
    {
        "code": "453220",
        "description": "Gift, Novelty, and Souvenir Stores"
    },
    {
        "code": "4533",
        "description": "Used Merchandise Stores"
    },
    {
        "code": "45331",
        "description": "Used Merchandise Stores"
    },
    {
        "code": "453310",
        "description": "Used Merchandise Stores"
    },
    {
        "code": "4539",
        "description": "Other Miscellaneous Store Retailers"
    },
    {
        "code": "45391",
        "description": "Pet and Pet Supplies Stores"
    },
    {
        "code": "453910",
        "description": "Pet and Pet Supplies Stores"
    },
    {
        "code": "45392",
        "description": "Art Dealers"
    },
    {
        "code": "453920",
        "description": "Art Dealers"
    },
    {
        "code": "45393",
        "description": "Manufactured (Mobile) Home Dealers"
    },
    {
        "code": "453930",
        "description": "Manufactured (Mobile) Home Dealers"
    },
    {
        "code": "45399",
        "description": "All Other Miscellaneous Store Retailers"
    },
    {
        "code": "453991",
        "description": "Tobacco Stores"
    },
    {
        "code": "453998",
        "description": "All Other Miscellaneous Store Retailers (except Tobacco Stores)"
    },
    {
        "code": "454",
        "description": "Nonstore Retailers"
    },
    {
        "code": "4541",
        "description": "Electronic Shopping and Mail-Order Houses"
    },
    {
        "code": "45411",
        "description": "Electronic Shopping and Mail-Order Houses"
    },
    {
        "code": "454111",
        "description": "Electronic Shopping"
    },
    {
        "code": "454112",
        "description": "Electronic Auctions"
    },
    {
        "code": "454113",
        "description": "Mail-Order Houses"
    },
    {
        "code": "4542",
        "description": "Vending Machine Operators"
    },
    {
        "code": "45421",
        "description": "Vending Machine Operators"
    },
    {
        "code": "454210",
        "description": "Vending Machine Operators"
    },
    {
        "code": "4543",
        "description": "Direct Selling Establishments"
    },
    {
        "code": "45431",
        "description": "Fuel Dealers"
    },
    {
        "code": "454310",
        "description": "Fuel Dealers"
    },
    {
        "code": "45439",
        "description": "Other Direct Selling Establishments"
    },
    {
        "code": "454390",
        "description": "Other Direct Selling Establishments"
    },
    {
        "code": "481",
        "description": "Air Transportation"
    },
    {
        "code": "4811",
        "description": "Scheduled Air Transportation"
    },
    {
        "code": "48111",
        "description": "Scheduled Air Transportation"
    },
    {
        "code": "481111",
        "description": "Scheduled Passenger Air Transportation"
    },
    {
        "code": "481112",
        "description": "Scheduled Freight Air Transportation"
    },
    {
        "code": "4812",
        "description": "Nonscheduled Air Transportation"
    },
    {
        "code": "48121",
        "description": "Nonscheduled Air Transportation"
    },
    {
        "code": "481211",
        "description": "Nonscheduled Chartered Passenger Air Transportation"
    },
    {
        "code": "481212",
        "description": "Nonscheduled Chartered Freight Air Transportation"
    },
    {
        "code": "481219",
        "description": "Other Nonscheduled Air Transportation"
    },
    {
        "code": "482",
        "description": "Rail Transportation"
    },
    {
        "code": "4821",
        "description": "Rail Transportation"
    },
    {
        "code": "48211",
        "description": "Rail Transportation"
    },
    {
        "code": "482111",
        "description": "Line-Haul Railroads"
    },
    {
        "code": "482112",
        "description": "Short Line Railroads"
    },
    {
        "code": "483",
        "description": "Water Transportation"
    },
    {
        "code": "4831",
        "description": "Deep Sea, Coastal, and Great Lakes Water Transportation"
    },
    {
        "code": "48311",
        "description": "Deep Sea, Coastal, and Great Lakes Water Transportation"
    },
    {
        "code": "483111",
        "description": "Deep Sea Freight Transportation"
    },
    {
        "code": "483112",
        "description": "Deep Sea Passenger Transportation"
    },
    {
        "code": "483113",
        "description": "Coastal and Great Lakes Freight Transportation"
    },
    {
        "code": "483114",
        "description": "Coastal and Great Lakes Passenger Transportation"
    },
    {
        "code": "4832",
        "description": "Inland Water Transportation"
    },
    {
        "code": "48321",
        "description": "Inland Water Transportation"
    },
    {
        "code": "483211",
        "description": "Inland Water Freight Transportation"
    },
    {
        "code": "483212",
        "description": "Inland Water Passenger Transportation"
    },
    {
        "code": "484",
        "description": "Truck Transportation"
    },
    {
        "code": "4841",
        "description": "General Freight Trucking"
    },
    {
        "code": "48411",
        "description": "General Freight Trucking, Local"
    },
    {
        "code": "484110",
        "description": "General Freight Trucking, Local"
    },
    {
        "code": "48412",
        "description": "General Freight Trucking, Long-Distance"
    },
    {
        "code": "484121",
        "description": "General Freight Trucking, Long-Distance, Truckload"
    },
    {
        "code": "484122",
        "description": "General Freight Trucking, Long-Distance, Less Than Truckload"
    },
    {
        "code": "4842",
        "description": "Specialized Freight Trucking"
    },
    {
        "code": "48421",
        "description": "Used Household and Office Goods Moving"
    },
    {
        "code": "484210",
        "description": "Used Household and Office Goods Moving"
    },
    {
        "code": "48422",
        "description": "Specialized Freight (except Used Goods) Trucking, Local"
    },
    {
        "code": "484220",
        "description": "Specialized Freight (except Used Goods) Trucking, Local"
    },
    {
        "code": "48423",
        "description": "Specialized Freight (except Used Goods) Trucking, Long-Distance"
    },
    {
        "code": "484230",
        "description": "Specialized Freight (except Used Goods) Trucking, Long-Distance"
    },
    {
        "code": "485",
        "description": "Transit and Ground Passenger Transportation"
    },
    {
        "code": "4851",
        "description": "Urban Transit Systems"
    },
    {
        "code": "48511",
        "description": "Urban Transit Systems"
    },
    {
        "code": "485111",
        "description": "Mixed Mode Transit Systems"
    },
    {
        "code": "485112",
        "description": "Commuter Rail Systems"
    },
    {
        "code": "485113",
        "description": "Bus and Other Motor Vehicle Transit Systems"
    },
    {
        "code": "485119",
        "description": "Other Urban Transit Systems"
    },
    {
        "code": "4852",
        "description": "Interurban and Rural Bus Transportation"
    },
    {
        "code": "48521",
        "description": "Interurban and Rural Bus Transportation"
    },
    {
        "code": "485210",
        "description": "Interurban and Rural Bus Transportation"
    },
    {
        "code": "4853",
        "description": "Taxi and Limousine Service"
    },
    {
        "code": "48531",
        "description": "Taxi Service"
    },
    {
        "code": "485310",
        "description": "Taxi Service"
    },
    {
        "code": "48532",
        "description": "Limousine Service"
    },
    {
        "code": "485320",
        "description": "Limousine Service"
    },
    {
        "code": "4854",
        "description": "School and Employee Bus Transportation"
    },
    {
        "code": "48541",
        "description": "School and Employee Bus Transportation"
    },
    {
        "code": "485410",
        "description": "School and Employee Bus Transportation"
    },
    {
        "code": "4855",
        "description": "Charter Bus Industry"
    },
    {
        "code": "48551",
        "description": "Charter Bus Industry"
    },
    {
        "code": "485510",
        "description": "Charter Bus Industry"
    },
    {
        "code": "4859",
        "description": "Other Transit and Ground Passenger Transportation"
    },
    {
        "code": "48599",
        "description": "Other Transit and Ground Passenger Transportation"
    },
    {
        "code": "485991",
        "description": "Special Needs Transportation"
    },
    {
        "code": "485999",
        "description": "All Other Transit and Ground Passenger Transportation"
    },
    {
        "code": "486",
        "description": "Pipeline Transportation"
    },
    {
        "code": "4861",
        "description": "Pipeline Transportation of Crude Oil"
    },
    {
        "code": "48611",
        "description": "Pipeline Transportation of Crude Oil"
    },
    {
        "code": "486110",
        "description": "Pipeline Transportation of Crude Oil"
    },
    {
        "code": "4862",
        "description": "Pipeline Transportation of Natural Gas"
    },
    {
        "code": "48621",
        "description": "Pipeline Transportation of Natural Gas"
    },
    {
        "code": "486210",
        "description": "Pipeline Transportation of Natural Gas"
    },
    {
        "code": "48691",
        "description": "Pipeline Transportation of Refined Petroleum Products"
    },
    {
        "code": "486910",
        "description": "Pipeline Transportation of Refined Petroleum Products"
    },
    {
        "code": "48699",
        "description": "All Other Pipeline Transportation"
    },
    {
        "code": "486990",
        "description": "All Other Pipeline Transportation"
    },
    {
        "code": "487",
        "description": "Scenic and Sightseeing Transportation"
    },
    {
        "code": "4871",
        "description": "Scenic and Sightseeing Transportation, Land"
    },
    {
        "code": "48711",
        "description": "Scenic and Sightseeing Transportation, Land"
    },
    {
        "code": "487110",
        "description": "Scenic and Sightseeing Transportation, Land"
    },
    {
        "code": "4872",
        "description": "Scenic and Sightseeing Transportation, Water"
    },
    {
        "code": "48721",
        "description": "Scenic and Sightseeing Transportation, Water"
    },
    {
        "code": "487210",
        "description": "Scenic and Sightseeing Transportation, Water"
    },
    {
        "code": "4879",
        "description": "Scenic and Sightseeing Transportation, Other"
    },
    {
        "code": "48799",
        "description": "Scenic and Sightseeing Transportation, Other"
    },
    {
        "code": "487990",
        "description": "Scenic and Sightseeing Transportation, Other"
    },
    {
        "code": "488",
        "description": "Support Activities for Transportation"
    },
    {
        "code": "4881",
        "description": "Support Activities for Air Transportation"
    },
    {
        "code": "48811",
        "description": "Airport Operations"
    },
    {
        "code": "488111",
        "description": "Air Traffic Control"
    },
    {
        "code": "488119",
        "description": "Other Airport Operations"
    },
    {
        "code": "48819",
        "description": "Other Support Activities for Air Transportation"
    },
    {
        "code": "488190",
        "description": "Other Support Activities for Air Transportation"
    },
    {
        "code": "4882",
        "description": "Support Activities for Rail Transportation"
    },
    {
        "code": "48821",
        "description": "Support Activities for Rail Transportation"
    },
    {
        "code": "488210",
        "description": "Support Activities for Rail Transportation"
    },
    {
        "code": "4883",
        "description": "Support Activities for Water Transportation"
    },
    {
        "code": "48831",
        "description": "Port and Harbor Operations"
    },
    {
        "code": "488310",
        "description": "Port and Harbor Operations"
    },
    {
        "code": "48832",
        "description": "Marine Cargo Handling"
    },
    {
        "code": "488320",
        "description": "Marine Cargo Handling"
    },
    {
        "code": "48833",
        "description": "Navigational Services to Shipping"
    },
    {
        "code": "488330",
        "description": "Navigational Services to Shipping"
    },
    {
        "code": "48839",
        "description": "Other Support Activities for Water Transportation"
    },
    {
        "code": "488390",
        "description": "Other Support Activities for Water Transportation"
    },
    {
        "code": "4884",
        "description": "Support Activities for Road Transportation"
    },
    {
        "code": "48841",
        "description": "Motor Vehicle Towing"
    },
    {
        "code": "488410",
        "description": "Motor Vehicle Towing"
    },
    {
        "code": "48849",
        "description": "Other Support Activities for Road Transportation"
    },
    {
        "code": "488490",
        "description": "Other Support Activities for Road Transportation"
    },
    {
        "code": "4885",
        "description": "Freight Transportation Arrangement"
    },
    {
        "code": "48851",
        "description": "Freight Transportation Arrangement"
    },
    {
        "code": "488510",
        "description": "Freight Transportation Arrangement"
    },
    {
        "code": "4889",
        "description": "Other Support Activities for Transportation"
    },
    {
        "code": "48899",
        "description": "Other Support Activities for Transportation"
    },
    {
        "code": "488991",
        "description": "Packing and Crating"
    },
    {
        "code": "488999",
        "description": "All Other Support Activities for Transportation"
    },
    {
        "code": "491",
        "description": "Postal Service"
    },
    {
        "code": "4911",
        "description": "Postal Service"
    },
    {
        "code": "49111",
        "description": "Postal Service"
    },
    {
        "code": "491110",
        "description": "Postal Service"
    },
    {
        "code": "492",
        "description": "Couriers and Messengers"
    },
    {
        "code": "4921",
        "description": "Couriers and Express Delivery Services"
    },
    {
        "code": "49211",
        "description": "Couriers and Express Delivery Services"
    },
    {
        "code": "492110",
        "description": "Couriers and Express Delivery Services"
    },
    {
        "code": "4922",
        "description": "Local Messengers and Local Delivery"
    },
    {
        "code": "49221",
        "description": "Local Messengers and Local Delivery"
    },
    {
        "code": "492210",
        "description": "Local Messengers and Local Delivery"
    },
    {
        "code": "493",
        "description": "Warehousing and Storage"
    },
    {
        "code": "4931",
        "description": "Warehousing and Storage"
    },
    {
        "code": "49311",
        "description": "General Warehousing and Storage"
    },
    {
        "code": "493110",
        "description": "General Warehousing and Storage"
    },
    {
        "code": "49312",
        "description": "Refrigerated Warehousing and Storage"
    },
    {
        "code": "493120",
        "description": "Refrigerated Warehousing and Storage"
    },
    {
        "code": "49313",
        "description": "Farm Product Warehousing and Storage"
    },
    {
        "code": "493130",
        "description": "Farm Product Warehousing and Storage"
    },
    {
        "code": "49319",
        "description": "Other Warehousing and Storage"
    },
    {
        "code": "493190",
        "description": "Other Warehousing and Storage"
    },
    {
        "code": "51",
        "description": "Information"
    },
    {
        "code": "511",
        "description": "Publishing Industries (except Internet)"
    },
    {
        "code": "5111",
        "description": "Newspaper, Periodical, Book, and Directory Publishers"
    },
    {
        "code": "511120",
        "description": "Periodical Publishers"
    },
    {
        "code": "51113",
        "description": "Book Publishers"
    },
    {
        "code": "511130",
        "description": "Book Publishers"
    },
    {
        "code": "51114",
        "description": "Directory and Mailing List Publishers"
    },
    {
        "code": "511140",
        "description": "Directory and Mailing List Publishers"
    },
    {
        "code": "51119",
        "description": "Other Publishers"
    },
    {
        "code": "511191",
        "description": "Greeting Card Publishers"
    },
    {
        "code": "511199",
        "description": "All Other Publishers"
    },
    {
        "code": "5112",
        "description": "Software Publishers"
    },
    {
        "code": "51121",
        "description": "Software Publishers"
    },
    {
        "code": "511210",
        "description": "Software Publishers"
    },
    {
        "code": "512",
        "description": "Motion Picture and Sound Recording Industries"
    },
    {
        "code": "5121",
        "description": "Motion Picture and Video Industries"
    },
    {
        "code": "51211",
        "description": "Motion Picture and Video Production"
    },
    {
        "code": "512110",
        "description": "Motion Picture and Video Production"
    },
    {
        "code": "51212",
        "description": "Motion Picture and Video Distribution"
    },
    {
        "code": "512120",
        "description": "Motion Picture and Video Distribution"
    },
    {
        "code": "51213",
        "description": "Motion Picture and Video Exhibition"
    },
    {
        "code": "512131",
        "description": "Motion Picture Theaters (except Drive-Ins)"
    },
    {
        "code": "512132",
        "description": "Drive-In Motion Picture Theaters"
    },
    {
        "code": "51219",
        "description": "Postproduction Services and Other Motion Picture and Video Industries"
    },
    {
        "code": "512191",
        "description": "Teleproduction and Other Postproduction Services"
    },
    {
        "code": "512199",
        "description": "Other Motion Picture and Video Industries"
    },
    {
        "code": "5122",
        "description": "Sound Recording Industries"
    },
    {
        "code": "51221",
        "description": "Record Production"
    },
    {
        "code": "512210",
        "description": "Record Production"
    },
    {
        "code": "51222",
        "description": "Integrated Record Production/Distribution"
    },
    {
        "code": "512220",
        "description": "Integrated Record Production/Distribution"
    },
    {
        "code": "51223",
        "description": "Music Publishers"
    },
    {
        "code": "512230",
        "description": "Music Publishers"
    },
    {
        "code": "51224",
        "description": "Sound Recording Studios"
    },
    {
        "code": "512240",
        "description": "Sound Recording Studios"
    },
    {
        "code": "51229",
        "description": "Other Sound Recording Industries"
    },
    {
        "code": "512290",
        "description": "Other Sound Recording Industries"
    },
    {
        "code": "515",
        "description": "Broadcasting (except Internet)"
    },
    {
        "code": "5151",
        "description": "Radio and Television Broadcasting"
    },
    {
        "code": "51511",
        "description": "Radio Broadcasting"
    },
    {
        "code": "515111",
        "description": "Radio Networks"
    },
    {
        "code": "515112",
        "description": "Radio Stations"
    },
    {
        "code": "51512",
        "description": "Television Broadcasting"
    },
    {
        "code": "5152",
        "description": "Cable and Other Subscription Programming"
    },
    {
        "code": "51521",
        "description": "Cable and Other Subscription Programming"
    },
    {
        "code": "515210",
        "description": "Cable and Other Subscription Programming"
    },
    {
        "code": "517",
        "description": "Telecommunications"
    },
    {
        "code": "5171",
        "description": "Wired Telecommunications Carriers"
    },
    {
        "code": "51711",
        "description": "Wired Telecommunications Carriers"
    },
    {
        "code": "517110",
        "description": "Wired Telecommunications Carriers"
    },
    {
        "code": "5172",
        "description": "Wireless Telecommunications Carriers (except Satellite)"
    },
    {
        "code": "51721",
        "description": "Wireless Telecommunications Carriers (except Satellite)"
    },
    {
        "code": "517210",
        "description": "Wireless Telecommunications Carriers (except Satellite)"
    },
    {
        "code": "5174",
        "description": "Satellite Telecommunications"
    },
    {
        "code": "51741",
        "description": "Satellite Telecommunications"
    },
    {
        "code": "517410",
        "description": "Satellite Telecommunications"
    },
    {
        "code": "5179",
        "description": "Other Telecommunications"
    },
    {
        "code": "51791",
        "description": "Other Telecommunications"
    },
    {
        "code": "517911",
        "description": "Telecommunications Resellers"
    },
    {
        "code": "517919",
        "description": "All Other Telecommunications"
    },
    {
        "code": "518",
        "description": "Data Processing, Hosting, and Related Services"
    },
    {
        "code": "5182",
        "description": "Data Processing, Hosting, and Related Services"
    },
    {
        "code": "51821",
        "description": "Data Processing, Hosting, and Related Services"
    },
    {
        "code": "518210",
        "description": "Data Processing, Hosting, and Related Services"
    },
    {
        "code": "519",
        "description": "Other Information Services"
    },
    {
        "code": "5191",
        "description": "Other Information Services"
    },
    {
        "code": "51911",
        "description": "News Syndicates"
    },
    {
        "code": "519110",
        "description": "News Syndicates"
    },
    {
        "code": "51912",
        "description": "Libraries and Archives"
    },
    {
        "code": "519120",
        "description": "Libraries and Archives"
    },
    {
        "code": "51913",
        "description": "Internet Publishing and Broadcasting and Web Search Portals"
    },
    {
        "code": "519130",
        "description": "Internet Publishing and Broadcasting and Web Search Portals"
    },
    {
        "code": "51919",
        "description": "All Other Information Services"
    },
    {
        "code": "519190",
        "description": "All Other Information Services"
    },
    {
        "code": "52",
        "description": "Finance and Insurance"
    },
    {
        "code": "521",
        "description": "Monetary Authorities-Central Bank"
    },
    {
        "code": "5211",
        "description": "Monetary Authorities-Central Bank"
    },
    {
        "code": "52111",
        "description": "Monetary Authorities-Central Bank"
    },
    {
        "code": "521110",
        "description": "Monetary Authorities-Central Bank"
    },
    {
        "code": "522",
        "description": "Credit Intermediation and Related Activities"
    },
    {
        "code": "5221",
        "description": "Depository Credit Intermediation"
    },
    {
        "code": "52211",
        "description": "Commercial Banking"
    },
    {
        "code": "522110",
        "description": "Commercial Banking"
    },
    {
        "code": "52212",
        "description": "Savings Institutions"
    },
    {
        "code": "522120",
        "description": "Savings Institutions"
    },
    {
        "code": "52213",
        "description": "Credit Unions"
    },
    {
        "code": "522130",
        "description": "Credit Unions"
    },
    {
        "code": "52219",
        "description": "Other Depository Credit Intermediation"
    },
    {
        "code": "522190",
        "description": "Other Depository Credit Intermediation"
    },
    {
        "code": "5222",
        "description": "Nondepository Credit Intermediation"
    },
    {
        "code": "52221",
        "description": "Credit Card Issuing"
    },
    {
        "code": "522210",
        "description": "Credit Card Issuing"
    },
    {
        "code": "52222",
        "description": "Sales Financing"
    },
    {
        "code": "522220",
        "description": "Sales Financing"
    },
    {
        "code": "52229",
        "description": "Other Nondepository Credit Intermediation"
    },
    {
        "code": "522291",
        "description": "Consumer Lending"
    },
    {
        "code": "522292",
        "description": "Real Estate Credit"
    },
    {
        "code": "522293",
        "description": "International Trade Financing"
    },
    {
        "code": "522294",
        "description": "Secondary Market Financing"
    },
    {
        "code": "522298",
        "description": "All Other Nondepository Credit Intermediation"
    },
    {
        "code": "5223",
        "description": "Activities Related to Credit Intermediation"
    },
    {
        "code": "52231",
        "description": "Mortgage and Nonmortgage Loan Brokers"
    },
    {
        "code": "522310",
        "description": "Mortgage and Nonmortgage Loan Brokers"
    },
    {
        "code": "52232",
        "description": "Financial Transactions Processing, Reserve, and Clearinghouse Activities"
    },
    {
        "code": "522320",
        "description": "Financial Transactions Processing, Reserve, and Clearinghouse Activities"
    },
    {
        "code": "52239",
        "description": "Other Activities Related to Credit Intermediation"
    },
    {
        "code": "522390",
        "description": "Other Activities Related to Credit Intermediation"
    },
    {
        "code": "523",
        "description": "Securities, Commodity Contracts, and Other Financial Investments and Related Activities"
    },
    {
        "code": "5231",
        "description": "Securities and Commodity Contracts Intermediation and Brokerage"
    },
    {
        "code": "52311",
        "description": "Investment Banking and Securities Dealing"
    },
    {
        "code": "523110",
        "description": "Investment Banking and Securities Dealing"
    },
    {
        "code": "52312",
        "description": "Securities Brokerage"
    },
    {
        "code": "523120",
        "description": "Securities Brokerage"
    },
    {
        "code": "52313",
        "description": "Commodity Contracts Dealing"
    },
    {
        "code": "523130",
        "description": "Commodity Contracts Dealing"
    },
    {
        "code": "52314",
        "description": "Commodity Contracts Brokerage"
    },
    {
        "code": "523140",
        "description": "Commodity Contracts Brokerage"
    },
    {
        "code": "5232",
        "description": "Securities and Commodity Exchanges"
    },
    {
        "code": "52321",
        "description": "Securities and Commodity Exchanges"
    },
    {
        "code": "523210",
        "description": "Securities and Commodity Exchanges"
    },
    {
        "code": "5239",
        "description": "Other Financial Investment Activities"
    },
    {
        "code": "52391",
        "description": "Miscellaneous Intermediation"
    },
    {
        "code": "523910",
        "description": "Miscellaneous Intermediation"
    },
    {
        "code": "52392",
        "description": "Portfolio Management"
    },
    {
        "code": "523920",
        "description": "Portfolio Management"
    },
    {
        "code": "52393",
        "description": "Investment Advice"
    },
    {
        "code": "523930",
        "description": "Investment Advice"
    },
    {
        "code": "52399",
        "description": "All Other Financial Investment Activities"
    },
    {
        "code": "523991",
        "description": "Trust, Fiduciary, and Custody Activities"
    },
    {
        "code": "523999",
        "description": "Miscellaneous Financial Investment Activities"
    },
    {
        "code": "524",
        "description": "Insurance Carriers and Related Activities"
    },
    {
        "code": "5241",
        "description": "Insurance Carriers"
    },
    {
        "code": "52411",
        "description": "Direct Life, Health, and Medical Insurance Carriers"
    },
    {
        "code": "524113",
        "description": "Direct Life Insurance Carriers"
    },
    {
        "code": "524114",
        "description": "Direct Health and Medical Insurance Carriers"
    },
    {
        "code": "52412",
        "description": "Direct Insurance (except Life, Health, and Medical) Carriers"
    },
    {
        "code": "524126",
        "description": "Direct Property and Casualty Insurance Carriers"
    },
    {
        "code": "524127",
        "description": "Direct Title Insurance Carriers"
    },
    {
        "code": "524128",
        "description": "Other Direct Insurance (except Life, Health, and Medical) Carriers"
    },
    {
        "code": "52413",
        "description": "Reinsurance Carriers"
    },
    {
        "code": "524130",
        "description": "Reinsurance Carriers"
    },
    {
        "code": "5242",
        "description": "Agencies, Brokerages, and Other Insurance Related Activities"
    },
    {
        "code": "52421",
        "description": "Insurance Agencies and Brokerages"
    },
    {
        "code": "524210",
        "description": "Insurance Agencies and Brokerages"
    },
    {
        "code": "52429",
        "description": "Other Insurance Related Activities"
    },
    {
        "code": "524291",
        "description": "Claims Adjusting"
    },
    {
        "code": "524292",
        "description": "Third Party Administration of Insurance and Pension Funds"
    },
    {
        "code": "524298",
        "description": "All Other Insurance Related Activities"
    },
    {
        "code": "525",
        "description": "Funds, Trusts, and Other Financial Vehicles"
    },
    {
        "code": "5251",
        "description": "Insurance and Employee Benefit Funds"
    },
    {
        "code": "52511",
        "description": "Pension Funds"
    },
    {
        "code": "525110",
        "description": "Pension Funds"
    },
    {
        "code": "52512",
        "description": "Health and Welfare Funds"
    },
    {
        "code": "525120",
        "description": "Health and Welfare Funds"
    },
    {
        "code": "52519",
        "description": "Other Insurance Funds"
    },
    {
        "code": "525190",
        "description": "Other Insurance Funds"
    },
    {
        "code": "5259",
        "description": "Other Investment Pools and Funds"
    },
    {
        "code": "52591",
        "description": "Open-End Investment Funds"
    },
    {
        "code": "525910",
        "description": "Open-End Investment Funds"
    },
    {
        "code": "52592",
        "description": "Trusts, Estates, and Agency Accounts"
    },
    {
        "code": "525920",
        "description": "Trusts, Estates, and Agency Accounts"
    },
    {
        "code": "52599",
        "description": "Other Financial Vehicles"
    },
    {
        "code": "525990",
        "description": "Other Financial Vehicles"
    },
    {
        "code": "53",
        "description": "Real Estate and Rental and Leasing"
    },
    {
        "code": "531",
        "description": "Real Estate"
    },
    {
        "code": "5311",
        "description": "Lessors of Real Estate"
    },
    {
        "code": "53111",
        "description": "Lessors of Residential Buildings and Dwellings"
    },
    {
        "code": "531110",
        "description": "Lessors of Residential Buildings and Dwellings"
    },
    {
        "code": "53112",
        "description": "Lessors of Nonresidential Buildings (except Miniwarehouses)"
    },
    {
        "code": "531120",
        "description": "Lessors of Nonresidential Buildings (except Miniwarehouses)"
    },
    {
        "code": "53113",
        "description": "Lessors of Miniwarehouses and Self-Storage Units"
    },
    {
        "code": "531130",
        "description": "Lessors of Miniwarehouses and Self-Storage Units"
    },
    {
        "code": "53119",
        "description": "Lessors of Other Real Estate Property"
    },
    {
        "code": "531190",
        "description": "Lessors of Other Real Estate Property"
    },
    {
        "code": "5312",
        "description": "Offices of Real Estate Agents and Brokers"
    },
    {
        "code": "53121",
        "description": "Offices of Real Estate Agents and Brokers"
    },
    {
        "code": "531210",
        "description": "Offices of Real Estate Agents and Brokers"
    },
    {
        "code": "5313",
        "description": "Activities Related to Real Estate"
    },
    {
        "code": "53131",
        "description": "Real Estate Property Managers"
    },
    {
        "code": "531311",
        "description": "Residential Property Managers"
    },
    {
        "code": "531312",
        "description": "Nonresidential Property Managers"
    },
    {
        "code": "53132",
        "description": "Offices of Real Estate Appraisers"
    },
    {
        "code": "531320",
        "description": "Offices of Real Estate Appraisers"
    },
    {
        "code": "53139",
        "description": "Other Activities Related to Real Estate"
    },
    {
        "code": "531390",
        "description": "Other Activities Related to Real Estate"
    },
    {
        "code": "532",
        "description": "Rental and Leasing Services"
    },
    {
        "code": "5321",
        "description": "Automotive Equipment Rental and Leasing"
    },
    {
        "code": "53211",
        "description": "Passenger Car Rental and Leasing"
    },
    {
        "code": "532111",
        "description": "Passenger Car Rental"
    },
    {
        "code": "532112",
        "description": "Passenger Car Leasing"
    },
    {
        "code": "53212",
        "description": "Truck, Utility Trailer, and RV (Recreational Vehicle) Rental and Leasing"
    },
    {
        "code": "532120",
        "description": "Truck, Utility Trailer, and RV (Recreational Vehicle) Rental and Leasing"
    },
    {
        "code": "5322",
        "description": "Consumer Goods Rental"
    },
    {
        "code": "53221",
        "description": "Consumer Electronics and Appliances Rental"
    },
    {
        "code": "532210",
        "description": "Consumer Electronics and Appliances Rental"
    },
    {
        "code": "53222",
        "description": "Formal Wear and Costume Rental"
    },
    {
        "code": "532220",
        "description": "Formal Wear and Costume Rental"
    },
    {
        "code": "53223",
        "description": "Video Tape and Disc Rental"
    },
    {
        "code": "532230",
        "description": "Video Tape and Disc Rental"
    },
    {
        "code": "53229",
        "description": "Other Consumer Goods Rental"
    },
    {
        "code": "532291",
        "description": "Home Health Equipment Rental"
    },
    {
        "code": "532292",
        "description": "Recreational Goods Rental"
    },
    {
        "code": "532299",
        "description": "All Other Consumer Goods Rental"
    },
    {
        "code": "5323",
        "description": "General Rental Centers"
    },
    {
        "code": "53231",
        "description": "General Rental Centers"
    },
    {
        "code": "532310",
        "description": "General Rental Centers"
    },
    {
        "code": "5324",
        "description": "Commercial and Industrial Machinery and Equipment Rental and Leasing"
    },
    {
        "code": "53241",
        "description": "Construction, Transportation, Mining, and Forestry Machinery and Equipment Rental and Leasing"
    },
    {
        "code": "532411",
        "description": "Commercial Air, Rail, and Water Transportation Equipment Rental and Leasing"
    },
    {
        "code": "532412",
        "description": "Construction, Mining, and Forestry Machinery and Equipment Rental and Leasing"
    },
    {
        "code": "53242",
        "description": "Office Machinery and Equipment Rental and Leasing"
    },
    {
        "code": "532420",
        "description": "Office Machinery and Equipment Rental and Leasing"
    },
    {
        "code": "5511",
        "description": "Management of Companies and Enterprises"
    },
    {
        "code": "53249",
        "description": "Other Commercial and Industrial Machinery and Equipment Rental and Leasing"
    },
    {
        "code": "532490",
        "description": "Other Commercial and Industrial Machinery and Equipment Rental and Leasing"
    },
    {
        "code": "533",
        "description": "Lessors of Nonfinancial Intangible Assets (except Copyrighted Works)"
    },
    {
        "code": "5331",
        "description": "Lessors of Nonfinancial Intangible Assets (except Copyrighted Works)"
    },
    {
        "code": "53311",
        "description": "Lessors of Nonfinancial Intangible Assets (except Copyrighted Works)"
    },
    {
        "code": "533110",
        "description": "Lessors of Nonfinancial Intangible Assets (except Copyrighted Works)"
    },
    {
        "code": "54",
        "description": "Professional, Scientific, and Technical Services"
    },
    {
        "code": "541",
        "description": "Professional, Scientific, and Technical Services"
    },
    {
        "code": "5411",
        "description": "Legal Services"
    },
    {
        "code": "54111",
        "description": "Offices of Lawyers"
    },
    {
        "code": "541110",
        "description": "Offices of Lawyers"
    },
    {
        "code": "54112",
        "description": "Offices of Notaries"
    },
    {
        "code": "541120",
        "description": "Offices of Notaries"
    },
    {
        "code": "54119",
        "description": "Other Legal Services"
    },
    {
        "code": "541191",
        "description": "Title Abstract and Settlement Offices"
    },
    {
        "code": "541199",
        "description": "All Other Legal Services"
    },
    {
        "code": "5412",
        "description": "Accounting, Tax Preparation, Bookkeeping, and Payroll Services"
    },
    {
        "code": "54121",
        "description": "Accounting, Tax Preparation, Bookkeeping, and Payroll Services"
    },
    {
        "code": "541211",
        "description": "Offices of Certified Public Accountants"
    },
    {
        "code": "541213",
        "description": "Tax Preparation Services"
    },
    {
        "code": "541214",
        "description": "Payroll Services"
    },
    {
        "code": "541219",
        "description": "Other Accounting Services"
    },
    {
        "code": "5413",
        "description": "Architectural, Engineering, and Related Services"
    },
    {
        "code": "54131",
        "description": "Architectural Services"
    },
    {
        "code": "541310",
        "description": "Architectural Services"
    },
    {
        "code": "54132",
        "description": "Landscape Architectural Services"
    },
    {
        "code": "541320",
        "description": "Landscape Architectural Services"
    },
    {
        "code": "54133",
        "description": "Engineering Services"
    },
    {
        "code": "541330",
        "description": "Engineering Services"
    },
    {
        "code": "54134",
        "description": "Drafting Services"
    },
    {
        "code": "541340",
        "description": "Drafting Services"
    },
    {
        "code": "54135",
        "description": "Building Inspection Services"
    },
    {
        "code": "541350",
        "description": "Building Inspection Services"
    },
    {
        "code": "54136",
        "description": "Geophysical Surveying and Mapping Services"
    },
    {
        "code": "541360",
        "description": "Geophysical Surveying and Mapping Services"
    },
    {
        "code": "54137",
        "description": "Surveying and Mapping (except Geophysical) Services"
    },
    {
        "code": "541370",
        "description": "Surveying and Mapping (except Geophysical) Services"
    },
    {
        "code": "54138",
        "description": "Testing Laboratories"
    },
    {
        "code": "541380",
        "description": "Testing Laboratories"
    },
    {
        "code": "5414",
        "description": "Specialized Design Services"
    },
    {
        "code": "54141",
        "description": "Interior Design Services"
    },
    {
        "code": "541410",
        "description": "Interior Design Services"
    },
    {
        "code": "54142",
        "description": "Industrial Design Services"
    },
    {
        "code": "541420",
        "description": "Industrial Design Services"
    },
    {
        "code": "54143",
        "description": "Graphic Design Services"
    },
    {
        "code": "541430",
        "description": "Graphic Design Services"
    },
    {
        "code": "54149",
        "description": "Other Specialized Design Services"
    },
    {
        "code": "541490",
        "description": "Other Specialized Design Services"
    },
    {
        "code": "5415",
        "description": "Computer Systems Design and Related Services"
    },
    {
        "code": "54151",
        "description": "Computer Systems Design and Related Services"
    },
    {
        "code": "541511",
        "description": "Custom Computer Programming Services"
    },
    {
        "code": "541512",
        "description": "Computer Systems Design Services"
    },
    {
        "code": "541513",
        "description": "Computer Facilities Management Services"
    },
    {
        "code": "541519",
        "description": "Other Computer Related Services"
    },
    {
        "code": "5416",
        "description": "Management, Scientific, and Technical Consulting Services"
    },
    {
        "code": "54161",
        "description": "Management Consulting Services"
    },
    {
        "code": "541611",
        "description": "Administrative Management and General Management Consulting Services"
    },
    {
        "code": "541612",
        "description": "Human Resources Consulting Services"
    },
    {
        "code": "541613",
        "description": "Marketing Consulting Services"
    },
    {
        "code": "541614",
        "description": "Process, Physical Distribution, and Logistics Consulting Services"
    },
    {
        "code": "541618",
        "description": "Other Management Consulting Services"
    },
    {
        "code": "54162",
        "description": "Environmental Consulting Services"
    },
    {
        "code": "541620",
        "description": "Environmental Consulting Services"
    },
    {
        "code": "54169",
        "description": "Other Scientific and Technical Consulting Services"
    },
    {
        "code": "541690",
        "description": "Other Scientific and Technical Consulting Services"
    },
    {
        "code": "5417",
        "description": "Scientific Research and Development Services"
    },
    {
        "code": "54171",
        "description": "Research and Development in the Physical, Engineering, and Life Sciences"
    },
    {
        "code": "541711",
        "description": "Research and Development in Biotechnology"
    },
    {
        "code": "541712",
        "description": "Research and Development in the Physical, Engineering, and Life Sciences (except Biotechnology)"
    },
    {
        "code": "54172",
        "description": "Research and Development in the Social Sciences and Humanities"
    },
    {
        "code": "541720",
        "description": "Research and Development in the Social Sciences and Humanities"
    },
    {
        "code": "5418",
        "description": "Advertising, Public Relations, and Related Services"
    },
    {
        "code": "54181",
        "description": "Advertising Agencies"
    },
    {
        "code": "541810",
        "description": "Advertising Agencies"
    },
    {
        "code": "54182",
        "description": "Public Relations Agencies"
    },
    {
        "code": "541820",
        "description": "Public Relations Agencies"
    },
    {
        "code": "54183",
        "description": "Media Buying Agencies"
    },
    {
        "code": "541830",
        "description": "Media Buying Agencies"
    },
    {
        "code": "54184",
        "description": "Media Representatives"
    },
    {
        "code": "541840",
        "description": "Media Representatives"
    },
    {
        "code": "54185",
        "description": "Outdoor Advertising"
    },
    {
        "code": "541850",
        "description": "Outdoor Advertising"
    },
    {
        "code": "54186",
        "description": "Direct Mail Advertising"
    },
    {
        "code": "541860",
        "description": "Direct Mail Advertising"
    },
    {
        "code": "54187",
        "description": "Advertising Material Distribution Services"
    },
    {
        "code": "541870",
        "description": "Advertising Material Distribution Services"
    },
    {
        "code": "54189",
        "description": "Other Services Related to Advertising"
    },
    {
        "code": "541890",
        "description": "Other Services Related to Advertising"
    },
    {
        "code": "5419",
        "description": "Other Professional, Scientific, and Technical Services"
    },
    {
        "code": "54191",
        "description": "Marketing Research and Public Opinion Polling"
    },
    {
        "code": "541910",
        "description": "Marketing Research and Public Opinion Polling"
    },
    {
        "code": "54192",
        "description": "Photographic Services"
    },
    {
        "code": "541921",
        "description": "Photography Studios, Portrait"
    },
    {
        "code": "541922",
        "description": "Commercial Photography"
    },
    {
        "code": "54193",
        "description": "Translation and Interpretation Services"
    },
    {
        "code": "541930",
        "description": "Translation and Interpretation Services"
    },
    {
        "code": "54194",
        "description": "Veterinary Services"
    },
    {
        "code": "541940",
        "description": "Veterinary Services"
    },
    {
        "code": "54199",
        "description": "All Other Professional, Scientific, and Technical Services"
    },
    {
        "code": "541990",
        "description": "All Other Professional, Scientific, and Technical Services"
    },
    {
        "code": "55",
        "description": "Management of Companies and Enterprises"
    },
    {
        "code": "551",
        "description": "Management of Companies and Enterprises"
    },
    {
        "code": "624221",
        "description": "Temporary Shelters"
    },
    {
        "code": "55111",
        "description": "Management of Companies and Enterprises"
    },
    {
        "code": "551111",
        "description": "Offices of Bank Holding Companies"
    },
    {
        "code": "551112",
        "description": "Offices of Other Holding Companies"
    },
    {
        "code": "551114",
        "description": "Corporate, Subsidiary, and Regional Managing Offices"
    },
    {
        "code": "56",
        "description": "Administrative and Support and Waste Management and Remediation Services"
    },
    {
        "code": "561",
        "description": "Administrative and Support Services"
    },
    {
        "code": "5611",
        "description": "Office Administrative Services"
    },
    {
        "code": "56111",
        "description": "Office Administrative Services"
    },
    {
        "code": "561110",
        "description": "Office Administrative Services"
    },
    {
        "code": "5612",
        "description": "Facilities Support Services"
    },
    {
        "code": "56121",
        "description": "Facilities Support Services"
    },
    {
        "code": "561210",
        "description": "Facilities Support Services"
    },
    {
        "code": "5613",
        "description": "Employment Services"
    },
    {
        "code": "56131",
        "description": "Employment Placement Agencies and Executive Search Services"
    },
    {
        "code": "561311",
        "description": "Employment Placement Agencies"
    },
    {
        "code": "561312",
        "description": "Executive Search Services"
    },
    {
        "code": "56132",
        "description": "Temporary Help Services"
    },
    {
        "code": "561320",
        "description": "Temporary Help Services"
    },
    {
        "code": "56133",
        "description": "Professional Employer Organizations"
    },
    {
        "code": "561330",
        "description": "Professional Employer Organizations"
    },
    {
        "code": "5614",
        "description": "Business Support Services"
    },
    {
        "code": "56141",
        "description": "Document Preparation Services"
    },
    {
        "code": "561410",
        "description": "Document Preparation Services"
    },
    {
        "code": "56142",
        "description": "Telephone Call Centers"
    },
    {
        "code": "561421",
        "description": "Telephone Answering Services"
    },
    {
        "code": "561422",
        "description": "Telemarketing Bureaus and Other Contact Centers"
    },
    {
        "code": "56143",
        "description": "Business Service Centers"
    },
    {
        "code": "561431",
        "description": "Private Mail Centers"
    },
    {
        "code": "561439",
        "description": "Other Business Service Centers (including Copy Shops)"
    },
    {
        "code": "56144",
        "description": "Collection Agencies"
    },
    {
        "code": "561440",
        "description": "Collection Agencies"
    },
    {
        "code": "56145",
        "description": "Credit Bureaus"
    },
    {
        "code": "561450",
        "description": "Credit Bureaus"
    },
    {
        "code": "56149",
        "description": "Other Business Support Services"
    },
    {
        "code": "561491",
        "description": "Repossession Services"
    },
    {
        "code": "561492",
        "description": "Court Reporting and Stenotype Services"
    },
    {
        "code": "561499",
        "description": "All Other Business Support Services"
    },
    {
        "code": "5615",
        "description": "Travel Arrangement and Reservation Services"
    },
    {
        "code": "56151",
        "description": "Travel Agencies"
    },
    {
        "code": "561510",
        "description": "Travel Agencies"
    },
    {
        "code": "56152",
        "description": "Tour Operators"
    },
    {
        "code": "561520",
        "description": "Tour Operators"
    },
    {
        "code": "56159",
        "description": "Other Travel Arrangement and Reservation Services"
    },
    {
        "code": "561591",
        "description": "Convention and Visitors Bureaus"
    },
    {
        "code": "561599",
        "description": "All Other Travel Arrangement and Reservation Services"
    },
    {
        "code": "5616",
        "description": "Investigation and Security Services"
    },
    {
        "code": "56161",
        "description": "Investigation, Guard, and Armored Car Services"
    },
    {
        "code": "561611",
        "description": "Investigation Services"
    },
    {
        "code": "561612",
        "description": "Security Guards and Patrol Services"
    },
    {
        "code": "561613",
        "description": "Armored Car Services"
    },
    {
        "code": "56162",
        "description": "Security Systems Services"
    },
    {
        "code": "561621",
        "description": "Security Systems Services (except Locksmiths)"
    },
    {
        "code": "561622",
        "description": "Locksmiths"
    },
    {
        "code": "5617",
        "description": "Services to Buildings and Dwellings"
    },
    {
        "code": "56171",
        "description": "Exterminating and Pest Control Services"
    },
    {
        "code": "561710",
        "description": "Exterminating and Pest Control Services"
    },
    {
        "code": "56172",
        "description": "Janitorial Services"
    },
    {
        "code": "561720",
        "description": "Janitorial Services"
    },
    {
        "code": "56173",
        "description": "Landscaping Services"
    },
    {
        "code": "561730",
        "description": "Landscaping Services"
    },
    {
        "code": "56174",
        "description": "Carpet and Upholstery Cleaning Services"
    },
    {
        "code": "561740",
        "description": "Carpet and Upholstery Cleaning Services"
    },
    {
        "code": "56179",
        "description": "Other Services to Buildings and Dwellings"
    },
    {
        "code": "561790",
        "description": "Other Services to Buildings and Dwellings"
    },
    {
        "code": "5619",
        "description": "Other Support Services"
    },
    {
        "code": "56191",
        "description": "Packaging and Labeling Services"
    },
    {
        "code": "561910",
        "description": "Packaging and Labeling Services"
    },
    {
        "code": "56192",
        "description": "Convention and Trade Show Organizers"
    },
    {
        "code": "561920",
        "description": "Convention and Trade Show Organizers"
    },
    {
        "code": "56199",
        "description": "All Other Support Services"
    },
    {
        "code": "561990",
        "description": "All Other Support Services"
    },
    {
        "code": "562",
        "description": "Waste Management and Remediation Services"
    },
    {
        "code": "5621",
        "description": "Waste Collection"
    },
    {
        "code": "56211",
        "description": "Waste Collection"
    },
    {
        "code": "562111",
        "description": "Solid Waste Collection"
    },
    {
        "code": "562112",
        "description": "Hazardous Waste Collection"
    },
    {
        "code": "562119",
        "description": "Other Waste Collection"
    },
    {
        "code": "5622",
        "description": "Waste Treatment and Disposal"
    },
    {
        "code": "56221",
        "description": "Waste Treatment and Disposal"
    },
    {
        "code": "562211",
        "description": "Hazardous Waste Treatment and Disposal"
    },
    {
        "code": "562212",
        "description": "Solid Waste Landfill"
    },
    {
        "code": "562213",
        "description": "Solid Waste Combustors and Incinerators"
    },
    {
        "code": "562219",
        "description": "Other Nonhazardous Waste Treatment and Disposal"
    },
    {
        "code": "5629",
        "description": "Remediation and Other Waste Management Services"
    },
    {
        "code": "56291",
        "description": "Remediation Services"
    },
    {
        "code": "562910",
        "description": "Remediation Services"
    },
    {
        "code": "56292",
        "description": "Materials Recovery Facilities"
    },
    {
        "code": "562920",
        "description": "Materials Recovery Facilities"
    },
    {
        "code": "56299",
        "description": "All Other Waste Management Services"
    },
    {
        "code": "562991",
        "description": "Septic Tank and Related Services"
    },
    {
        "code": "562998",
        "description": "All Other Miscellaneous Waste Management Services"
    },
    {
        "code": "61",
        "description": "Educational Services"
    },
    {
        "code": "611",
        "description": "Educational Services"
    },
    {
        "code": "6111",
        "description": "Elementary and Secondary Schools"
    },
    {
        "code": "61111",
        "description": "Elementary and Secondary Schools"
    },
    {
        "code": "611110",
        "description": "Elementary and Secondary Schools"
    },
    {
        "code": "6112",
        "description": "Junior Colleges"
    },
    {
        "code": "61121",
        "description": "Junior Colleges"
    },
    {
        "code": "611210",
        "description": "Junior Colleges"
    },
    {
        "code": "6113",
        "description": "Colleges, Universities, and Professional Schools"
    },
    {
        "code": "61131",
        "description": "Colleges, Universities, and Professional Schools"
    },
    {
        "code": "611310",
        "description": "Colleges, Universities, and Professional Schools"
    },
    {
        "code": "6114",
        "description": "Business Schools and Computer and Management Training"
    },
    {
        "code": "61141",
        "description": "Business and Secretarial Schools"
    },
    {
        "code": "611410",
        "description": "Business and Secretarial Schools"
    },
    {
        "code": "61142",
        "description": "Computer Training"
    },
    {
        "code": "611420",
        "description": "Computer Training"
    },
    {
        "code": "624210",
        "description": "Community Food Services"
    },
    {
        "code": "61143",
        "description": "Professional and Management Development Training"
    },
    {
        "code": "811111",
        "description": "General Automotive Repair"
    },
    {
        "code": "611430",
        "description": "Professional and Management Development Training"
    },
    {
        "code": "6115",
        "description": "Technical and Trade Schools"
    },
    {
        "code": "61151",
        "description": "Technical and Trade Schools"
    },
    {
        "code": "611511",
        "description": "Cosmetology and Barber Schools"
    },
    {
        "code": "611512",
        "description": "Flight Training"
    },
    {
        "code": "611513",
        "description": "Apprenticeship Training"
    },
    {
        "code": "611519",
        "description": "Other Technical and Trade Schools"
    },
    {
        "code": "6116",
        "description": "Other Schools and Instruction"
    },
    {
        "code": "61161",
        "description": "Fine Arts Schools"
    },
    {
        "code": "611610",
        "description": "Fine Arts Schools"
    },
    {
        "code": "61162",
        "description": "Sports and Recreation Instruction"
    },
    {
        "code": "611620",
        "description": "Sports and Recreation Instruction"
    },
    {
        "code": "61163",
        "description": "Language Schools"
    },
    {
        "code": "611630",
        "description": "Language Schools"
    },
    {
        "code": "61169",
        "description": "All Other Schools and Instruction"
    },
    {
        "code": "611691",
        "description": "Exam Preparation and Tutoring"
    },
    {
        "code": "611692",
        "description": "Automobile Driving Schools"
    },
    {
        "code": "611699",
        "description": "All Other Miscellaneous Schools and Instruction"
    },
    {
        "code": "6117",
        "description": "Educational Support Services"
    },
    {
        "code": "61171",
        "description": "Educational Support Services"
    },
    {
        "code": "611710",
        "description": "Educational Support Services"
    },
    {
        "code": "62",
        "description": "Health Care and Social Assistance"
    },
    {
        "code": "621",
        "description": "Ambulatory Health Care Services"
    },
    {
        "code": "6211",
        "description": "Offices of Physicians"
    },
    {
        "code": "62111",
        "description": "Offices of Physicians"
    },
    {
        "code": "621111",
        "description": "Offices of Physicians (except Mental Health Specialists)"
    },
    {
        "code": "621112",
        "description": "Offices of Physicians, Mental Health Specialists"
    },
    {
        "code": "6212",
        "description": "Offices of Dentists"
    },
    {
        "code": "62121",
        "description": "Offices of Dentists"
    },
    {
        "code": "621210",
        "description": "Offices of Dentists"
    },
    {
        "code": "6213",
        "description": "Offices of Other Health Practitioners"
    },
    {
        "code": "62131",
        "description": "Offices of Chiropractors"
    },
    {
        "code": "621310",
        "description": "Offices of Chiropractors"
    },
    {
        "code": "62132",
        "description": "Offices of Optometrists"
    },
    {
        "code": "621320",
        "description": "Offices of Optometrists"
    },
    {
        "code": "62133",
        "description": "Offices of Mental Health Practitioners (except Physicians)"
    },
    {
        "code": "621330",
        "description": "Offices of Mental Health Practitioners (except Physicians)"
    },
    {
        "code": "62134",
        "description": "Offices of Physical, Occupational and Speech Therapists, and Audiologists"
    },
    {
        "code": "621340",
        "description": "Offices of Physical, Occupational and Speech Therapists, and Audiologists"
    },
    {
        "code": "62139",
        "description": "Offices of All Other Health Practitioners"
    },
    {
        "code": "621391",
        "description": "Offices of Podiatrists"
    },
    {
        "code": "81219",
        "description": "Other Personal Care Services"
    },
    {
        "code": "621399",
        "description": "Offices of All Other Miscellaneous Health Practitioners"
    },
    {
        "code": "6214",
        "description": "Outpatient Care Centers"
    },
    {
        "code": "62141",
        "description": "Family Planning Centers"
    },
    {
        "code": "621410",
        "description": "Family Planning Centers"
    },
    {
        "code": "62142",
        "description": "Outpatient Mental Health and Substance Abuse Centers"
    },
    {
        "code": "621420",
        "description": "Outpatient Mental Health and Substance Abuse Centers"
    },
    {
        "code": "62149",
        "description": "Other Outpatient Care Centers"
    },
    {
        "code": "621491",
        "description": "HMO Medical Centers"
    },
    {
        "code": "621492",
        "description": "Kidney Dialysis Centers"
    },
    {
        "code": "621493",
        "description": "Freestanding Ambulatory Surgical and Emergency Centers"
    },
    {
        "code": "621498",
        "description": "All Other Outpatient Care Centers"
    },
    {
        "code": "6215",
        "description": "Medical and Diagnostic Laboratories"
    },
    {
        "code": "62151",
        "description": "Medical and Diagnostic Laboratories"
    },
    {
        "code": "621511",
        "description": "Medical Laboratories"
    },
    {
        "code": "621512",
        "description": "Diagnostic Imaging Centers"
    },
    {
        "code": "6216",
        "description": "Home Health Care Services"
    },
    {
        "code": "62161",
        "description": "Home Health Care Services"
    },
    {
        "code": "621610",
        "description": "Home Health Care Services"
    },
    {
        "code": "6219",
        "description": "Other Ambulatory Health Care Services"
    },
    {
        "code": "62191",
        "description": "Ambulance Services"
    },
    {
        "code": "621910",
        "description": "Ambulance Services"
    },
    {
        "code": "62199",
        "description": "All Other Ambulatory Health Care Services"
    },
    {
        "code": "621991",
        "description": "Blood and Organ Banks"
    },
    {
        "code": "621999",
        "description": "All Other Miscellaneous Ambulatory Health Care Services"
    },
    {
        "code": "622",
        "description": "Hospitals"
    },
    {
        "code": "6221",
        "description": "General Medical and Surgical Hospitals"
    },
    {
        "code": "62211",
        "description": "General Medical and Surgical Hospitals"
    },
    {
        "code": "622110",
        "description": "General Medical and Surgical Hospitals"
    },
    {
        "code": "6222",
        "description": "Psychiatric and Substance Abuse Hospitals"
    },
    {
        "code": "62221",
        "description": "Psychiatric and Substance Abuse Hospitals"
    },
    {
        "code": "622210",
        "description": "Psychiatric and Substance Abuse Hospitals"
    },
    {
        "code": "6223",
        "description": "Specialty (except Psychiatric and Substance Abuse) Hospitals"
    },
    {
        "code": "62231",
        "description": "Specialty (except Psychiatric and Substance Abuse) Hospitals"
    },
    {
        "code": "622310",
        "description": "Specialty (except Psychiatric and Substance Abuse) Hospitals"
    },
    {
        "code": "623",
        "description": "Nursing and Residential Care Facilities"
    },
    {
        "code": "6231",
        "description": "Nursing Care Facilities (Skilled Nursing Facilities)"
    },
    {
        "code": "62311",
        "description": "Nursing Care Facilities (Skilled Nursing Facilities)"
    },
    {
        "code": "623110",
        "description": "Nursing Care Facilities (Skilled Nursing Facilities)"
    },
    {
        "code": "6232",
        "description": "Residential Intellectual and Developmental Disability, Mental Health, and Substance Abuse Facilities"
    },
    {
        "code": "62321",
        "description": "Residential Intellectual and Developmental Disability Facilities"
    },
    {
        "code": "623210",
        "description": "Residential Intellectual and Developmental Disability Facilities"
    },
    {
        "code": "62322",
        "description": "Residential Mental Health and Substance Abuse Facilities"
    },
    {
        "code": "623220",
        "description": "Residential Mental Health and Substance Abuse Facilities"
    },
    {
        "code": "6233",
        "description": "Continuing Care Retirement Communities and Assisted Living Facilities for the Elderly"
    },
    {
        "code": "62331",
        "description": "Continuing Care Retirement Communities and Assisted Living Facilities for the Elderly"
    },
    {
        "code": "623311",
        "description": "Continuing Care Retirement Communities"
    },
    {
        "code": "623312",
        "description": "Assisted Living Facilities for the Elderly"
    },
    {
        "code": "6239",
        "description": "Other Residential Care Facilities"
    },
    {
        "code": "62399",
        "description": "Other Residential Care Facilities"
    },
    {
        "code": "623990",
        "description": "Other Residential Care Facilities"
    },
    {
        "code": "624",
        "description": "Social Assistance"
    },
    {
        "code": "6241",
        "description": "Individual and Family Services"
    },
    {
        "code": "62411",
        "description": "Child and Youth Services"
    },
    {
        "code": "624110",
        "description": "Child and Youth Services"
    },
    {
        "code": "62412",
        "description": "Services for the Elderly and Persons with Disabilities"
    },
    {
        "code": "624120",
        "description": "Services for the Elderly and Persons with Disabilities"
    },
    {
        "code": "62419",
        "description": "Other Individual and Family Services"
    },
    {
        "code": "624190",
        "description": "Other Individual and Family Services"
    },
    {
        "code": "6242",
        "description": "Community Food and Housing, and Emergency and Other Relief Services"
    },
    {
        "code": "62421",
        "description": "Community Food Services"
    },
    {
        "code": "62422",
        "description": "Community Housing Services"
    },
    {
        "code": "624229",
        "description": "Other Community Housing Services"
    },
    {
        "code": "62423",
        "description": "Emergency and Other Relief Services"
    },
    {
        "code": "624230",
        "description": "Emergency and Other Relief Services"
    },
    {
        "code": "6243",
        "description": "Vocational Rehabilitation Services"
    },
    {
        "code": "62431",
        "description": "Vocational Rehabilitation Services"
    },
    {
        "code": "624310",
        "description": "Vocational Rehabilitation Services"
    },
    {
        "code": "6244",
        "description": "Child Day Care Services"
    },
    {
        "code": "62441",
        "description": "Child Day Care Services"
    },
    {
        "code": "624410",
        "description": "Child Day Care Services"
    },
    {
        "code": "71",
        "description": "Arts, Entertainment, and Recreation"
    },
    {
        "code": "711",
        "description": "Performing Arts, Spectator Sports, and Related Industries"
    },
    {
        "code": "7111",
        "description": "Performing Arts Companies"
    },
    {
        "code": "71111",
        "description": "Theater Companies and Dinner Theaters"
    },
    {
        "code": "711110",
        "description": "Theater Companies and Dinner Theaters"
    },
    {
        "code": "71112",
        "description": "Dance Companies"
    },
    {
        "code": "711120",
        "description": "Dance Companies"
    },
    {
        "code": "71113",
        "description": "Musical Groups and Artists"
    },
    {
        "code": "711130",
        "description": "Musical Groups and Artists"
    },
    {
        "code": "71119",
        "description": "Other Performing Arts Companies"
    },
    {
        "code": "711190",
        "description": "Other Performing Arts Companies"
    },
    {
        "code": "7112",
        "description": "Spectator Sports"
    },
    {
        "code": "71121",
        "description": "Spectator Sports"
    },
    {
        "code": "711211",
        "description": "Sports Teams and Clubs"
    },
    {
        "code": "711212",
        "description": "Racetracks"
    },
    {
        "code": "711219",
        "description": "Other Spectator Sports"
    },
    {
        "code": "7113",
        "description": "Promoters of Performing Arts, Sports, and Similar Events"
    },
    {
        "code": "71131",
        "description": "Promoters of Performing Arts, Sports, and Similar Events with Facilities"
    },
    {
        "code": "711310",
        "description": "Promoters of Performing Arts, Sports, and Similar Events with Facilities"
    },
    {
        "code": "71132",
        "description": "Promoters of Performing Arts, Sports, and Similar Events without Facilities"
    },
    {
        "code": "711320",
        "description": "Promoters of Performing Arts, Sports, and Similar Events without Facilities"
    },
    {
        "code": "7114",
        "description": "Agents and Managers for Artists, Athletes, Entertainers, and Other Public Figures"
    },
    {
        "code": "71141",
        "description": "Agents and Managers for Artists, Athletes, Entertainers, and Other Public Figures"
    },
    {
        "code": "711410",
        "description": "Agents and Managers for Artists, Athletes, Entertainers, and Other Public Figures"
    },
    {
        "code": "7115",
        "description": "Independent Artists, Writers, and Performers"
    },
    {
        "code": "71151",
        "description": "Independent Artists, Writers, and Performers"
    },
    {
        "code": "711510",
        "description": "Independent Artists, Writers, and Performers"
    },
    {
        "code": "712",
        "description": "Museums, Historical Sites, and Similar Institutions"
    },
    {
        "code": "7121",
        "description": "Museums, Historical Sites, and Similar Institutions"
    },
    {
        "code": "71211",
        "description": "Museums"
    },
    {
        "code": "712110",
        "description": "Museums"
    },
    {
        "code": "71212",
        "description": "Historical Sites"
    },
    {
        "code": "712120",
        "description": "Historical Sites"
    },
    {
        "code": "71213",
        "description": "Zoos and Botanical Gardens"
    },
    {
        "code": "712130",
        "description": "Zoos and Botanical Gardens"
    },
    {
        "code": "71219",
        "description": "Nature Parks and Other Similar Institutions"
    },
    {
        "code": "712190",
        "description": "Nature Parks and Other Similar Institutions"
    },
    {
        "code": "713",
        "description": "Amusement, Gambling, and Recreation Industries"
    },
    {
        "code": "7131",
        "description": "Amusement Parks and Arcades"
    },
    {
        "code": "71311",
        "description": "Amusement and Theme Parks"
    },
    {
        "code": "713110",
        "description": "Amusement and Theme Parks"
    },
    {
        "code": "71312",
        "description": "Amusement Arcades"
    },
    {
        "code": "713120",
        "description": "Amusement Arcades"
    },
    {
        "code": "7132",
        "description": "Gambling Industries"
    },
    {
        "code": "71321",
        "description": "Casinos (except Casino Hotels)"
    },
    {
        "code": "713210",
        "description": "Casinos (except Casino Hotels)"
    },
    {
        "code": "71329",
        "description": "Other Gambling Industries"
    },
    {
        "code": "713290",
        "description": "Other Gambling Industries"
    },
    {
        "code": "7139",
        "description": "Other Amusement and Recreation Industries"
    },
    {
        "code": "71391",
        "description": "Golf Courses and Country Clubs"
    },
    {
        "code": "713910",
        "description": "Golf Courses and Country Clubs"
    },
    {
        "code": "71392",
        "description": "Skiing Facilities"
    },
    {
        "code": "713920",
        "description": "Skiing Facilities"
    },
    {
        "code": "71393",
        "description": "Marinas"
    },
    {
        "code": "713930",
        "description": "Marinas"
    },
    {
        "code": "71394",
        "description": "Fitness and Recreational Sports Centers"
    },
    {
        "code": "713940",
        "description": "Fitness and Recreational Sports Centers"
    },
    {
        "code": "71395",
        "description": "Bowling Centers"
    },
    {
        "code": "713950",
        "description": "Bowling Centers"
    },
    {
        "code": "71399",
        "description": "All Other Amusement and Recreation Industries"
    },
    {
        "code": "713990",
        "description": "All Other Amusement and Recreation Industries"
    },
    {
        "code": "72",
        "description": "Accommodation and Food Services"
    },
    {
        "code": "721",
        "description": "Accommodation"
    },
    {
        "code": "7211",
        "description": "Traveler Accommodation"
    },
    {
        "code": "72111",
        "description": "Hotels (except Casino Hotels) and Motels"
    },
    {
        "code": "721110",
        "description": "Hotels (except Casino Hotels) and Motels"
    },
    {
        "code": "72112",
        "description": "Casino Hotels"
    },
    {
        "code": "721120",
        "description": "Casino Hotels"
    },
    {
        "code": "72119",
        "description": "Other Traveler Accommodation"
    },
    {
        "code": "721191",
        "description": "Bed-and-Breakfast Inns"
    },
    {
        "code": "721199",
        "description": "All Other Traveler Accommodation"
    },
    {
        "code": "7212",
        "description": "RV (Recreational Vehicle) Parks and Recreational Camps"
    },
    {
        "code": "72121",
        "description": "RV (Recreational Vehicle) Parks and Recreational Camps"
    },
    {
        "code": "721211",
        "description": "RV (Recreational Vehicle) Parks and Campgrounds"
    },
    {
        "code": "721214",
        "description": "Recreational and Vacation Camps (except Campgrounds)"
    },
    {
        "code": "7213",
        "description": "Rooming and Boarding Houses"
    },
    {
        "code": "72131",
        "description": "Rooming and Boarding Houses"
    },
    {
        "code": "721310",
        "description": "Rooming and Boarding Houses"
    },
    {
        "code": "722",
        "description": "Food Services and Drinking Places"
    },
    {
        "code": "7223",
        "description": "Special Food Services"
    },
    {
        "code": "72231",
        "description": "Food Service Contractors"
    },
    {
        "code": "722310",
        "description": "Food Service Contractors"
    },
    {
        "code": "72232",
        "description": "Caterers"
    },
    {
        "code": "722320",
        "description": "Caterers"
    },
    {
        "code": "72233",
        "description": "Mobile Food Services"
    },
    {
        "code": "722330",
        "description": "Mobile Food Services"
    },
    {
        "code": "7224",
        "description": "Drinking Places (Alcoholic Beverages)"
    },
    {
        "code": "72241",
        "description": "Drinking Places (Alcoholic Beverages)"
    },
    {
        "code": "722410",
        "description": "Drinking Places (Alcoholic Beverages)"
    },
    {
        "code": "7225",
        "description": "Restaurants and Other Eating Places"
    },
    {
        "code": "72251",
        "description": "Restaurants and Other Eating Places"
    },
    {
        "code": "722511",
        "description": "Full-Service Restaurants"
    },
    {
        "code": "722513",
        "description": "Limited-Service Restaurants"
    },
    {
        "code": "722514",
        "description": "Cafeterias, Grill Buffets, and Buffets"
    },
    {
        "code": "722515",
        "description": "Snack and Nonalcoholic Beverage Bars"
    },
    {
        "code": "81",
        "description": "Other Services (except Public Administration)"
    },
    {
        "code": "811",
        "description": "Repair and Maintenance"
    },
    {
        "code": "8111",
        "description": "Automotive Repair and Maintenance"
    },
    {
        "code": "81111",
        "description": "Automotive Mechanical and Electrical Repair and Maintenance"
    },
    {
        "code": "811112",
        "description": "Automotive Exhaust System Repair"
    },
    {
        "code": "811113",
        "description": "Automotive Transmission Repair"
    },
    {
        "code": "811118",
        "description": "Other Automotive Mechanical and Electrical Repair and Maintenance"
    },
    {
        "code": "81112",
        "description": "Automotive Body, Paint, Interior, and Glass Repair"
    },
    {
        "code": "811121",
        "description": "Automotive Body, Paint, and Interior Repair and Maintenance"
    },
    {
        "code": "811122",
        "description": "Automotive Glass Replacement Shops"
    },
    {
        "code": "81119",
        "description": "Other Automotive Repair and Maintenance"
    },
    {
        "code": "811191",
        "description": "Automotive Oil Change and Lubrication Shops"
    },
    {
        "code": "811192",
        "description": "Car Washes"
    },
    {
        "code": "811198",
        "description": "All Other Automotive Repair and Maintenance"
    },
    {
        "code": "8112",
        "description": "Electronic and Precision Equipment Repair and Maintenance"
    },
    {
        "code": "81121",
        "description": "Electronic and Precision Equipment Repair and Maintenance"
    },
    {
        "code": "811211",
        "description": "Consumer Electronics Repair and Maintenance"
    },
    {
        "code": "811212",
        "description": "Computer and Office Machine Repair and Maintenance"
    },
    {
        "code": "811213",
        "description": "Communication Equipment Repair and Maintenance"
    },
    {
        "code": "811219",
        "description": "Other Electronic and Precision Equipment Repair and Maintenance"
    },
    {
        "code": "8113",
        "description": "Commercial and Industrial Machinery and Equipment (except Automotive and Electronic) Repair and Maintenance"
    },
    {
        "code": "81131",
        "description": "Commercial and Industrial Machinery and Equipment (except Automotive and Electronic) Repair and Maintenance"
    },
    {
        "code": "811310",
        "description": "Commercial and Industrial Machinery and Equipment (except Automotive and Electronic) Repair and Maintenance"
    },
    {
        "code": "8114",
        "description": "Personal and Household Goods Repair and Maintenance"
    },
    {
        "code": "81141",
        "description": "Home and Garden Equipment and Appliance Repair and Maintenance"
    },
    {
        "code": "811411",
        "description": "Home and Garden Equipment Repair and Maintenance"
    },
    {
        "code": "811412",
        "description": "Appliance Repair and Maintenance"
    },
    {
        "code": "81142",
        "description": "Reupholstery and Furniture Repair"
    },
    {
        "code": "811420",
        "description": "Reupholstery and Furniture Repair"
    },
    {
        "code": "81143",
        "description": "Footwear and Leather Goods Repair"
    },
    {
        "code": "811430",
        "description": "Footwear and Leather Goods Repair"
    },
    {
        "code": "81149",
        "description": "Other Personal and Household Goods Repair and Maintenance"
    },
    {
        "code": "811490",
        "description": "Other Personal and Household Goods Repair and Maintenance"
    },
    {
        "code": "812",
        "description": "Personal and Laundry Services"
    },
    {
        "code": "8121",
        "description": "Personal Care Services"
    },
    {
        "code": "81211",
        "description": "Hair, Nail, and Skin Care Services"
    },
    {
        "code": "812111",
        "description": "Barber Shops"
    },
    {
        "code": "812112",
        "description": "Beauty Salons"
    },
    {
        "code": "812113",
        "description": "Nail Salons"
    },
    {
        "code": "812191",
        "description": "Diet and Weight Reducing Centers"
    },
    {
        "code": "812199",
        "description": "Other Personal Care Services"
    },
    {
        "code": "8122",
        "description": "Death Care Services"
    },
    {
        "code": "81221",
        "description": "Funeral Homes and Funeral Services"
    },
    {
        "code": "812210",
        "description": "Funeral Homes and Funeral Services"
    },
    {
        "code": "81222",
        "description": "Cemeteries and Crematories"
    },
    {
        "code": "812220",
        "description": "Cemeteries and Crematories"
    },
    {
        "code": "8123",
        "description": "Drycleaning and Laundry Services"
    },
    {
        "code": "81231",
        "description": "Coin-Operated Laundries and Drycleaners"
    },
    {
        "code": "812310",
        "description": "Coin-Operated Laundries and Drycleaners"
    },
    {
        "code": "81232",
        "description": "Drycleaning and Laundry Services (except Coin-Operated)"
    },
    {
        "code": "812320",
        "description": "Drycleaning and Laundry Services (except Coin-Operated)"
    },
    {
        "code": "81233",
        "description": "Linen and Uniform Supply"
    },
    {
        "code": "812331",
        "description": "Linen Supply"
    },
    {
        "code": "812332",
        "description": "Industrial Launderers"
    },
    {
        "code": "8129",
        "description": "Other Personal Services"
    },
    {
        "code": "81291",
        "description": "Pet Care (except Veterinary) Services"
    },
    {
        "code": "812910",
        "description": "Pet Care (except Veterinary) Services"
    },
    {
        "code": "81292",
        "description": "Photofinishing"
    },
    {
        "code": "812921",
        "description": "Photofinishing Laboratories (except One-Hour)"
    },
    {
        "code": "812922",
        "description": "One-Hour Photofinishing"
    },
    {
        "code": "81293",
        "description": "Parking Lots and Garages"
    },
    {
        "code": "812930",
        "description": "Parking Lots and Garages"
    },
    {
        "code": "81299",
        "description": "All Other Personal Services"
    },
    {
        "code": "812990",
        "description": "All Other Personal Services"
    },
    {
        "code": "813",
        "description": "Religious, Grantmaking, Civic, Professional, and Similar Organizations"
    },
    {
        "code": "8131",
        "description": "Religious Organizations"
    },
    {
        "code": "81311",
        "description": "Religious Organizations"
    },
    {
        "code": "813110",
        "description": "Religious Organizations"
    },
    {
        "code": "8132",
        "description": "Grantmaking and Giving Services"
    },
    {
        "code": "81321",
        "description": "Grantmaking and Giving Services"
    },
    {
        "code": "813211",
        "description": "Grantmaking Foundations"
    },
    {
        "code": "813212",
        "description": "Voluntary Health Organizations"
    },
    {
        "code": "813219",
        "description": "Other Grantmaking and Giving Services"
    },
    {
        "code": "8133",
        "description": "Social Advocacy Organizations"
    },
    {
        "code": "81331",
        "description": "Social Advocacy Organizations"
    },
    {
        "code": "813311",
        "description": "Human Rights Organizations"
    },
    {
        "code": "813312",
        "description": "Environment, Conservation and Wildlife Organizations"
    },
    {
        "code": "813319",
        "description": "Other Social Advocacy Organizations"
    },
    {
        "code": "8134",
        "description": "Civic and Social Organizations"
    },
    {
        "code": "81341",
        "description": "Civic and Social Organizations"
    },
    {
        "code": "813410",
        "description": "Civic and Social Organizations"
    },
    {
        "code": "8139",
        "description": "Business, Professional, Labor, Political, and Similar Organizations"
    },
    {
        "code": "81391",
        "description": "Business Associations"
    },
    {
        "code": "813910",
        "description": "Business Associations"
    },
    {
        "code": "81392",
        "description": "Professional Organizations"
    },
    {
        "code": "813920",
        "description": "Professional Organizations"
    },
    {
        "code": "81393",
        "description": "Labor Unions and Similar Labor Organizations"
    },
    {
        "code": "813930",
        "description": "Labor Unions and Similar Labor Organizations"
    },
    {
        "code": "81394",
        "description": "Political Organizations"
    },
    {
        "code": "813940",
        "description": "Political Organizations"
    },
    {
        "code": "81399",
        "description": "Other Similar Organizations (except Business, Professional, Labor, and Political Organizations)"
    },
    {
        "code": "813990",
        "description": "Other Similar Organizations (except Business, Professional, Labor, and Political Organizations)"
    },
    {
        "code": "814",
        "description": "Private Households"
    },
    {
        "code": "8141",
        "description": "Private Households"
    },
    {
        "code": "81411",
        "description": "Private Households"
    },
    {
        "code": "814110",
        "description": "Private Households"
    },
    {
        "code": "92",
        "description": "Public Administration"
    },
    {
        "code": "921",
        "description": "Executive, Legislative, and Other General Government Support"
    },
    {
        "code": "9211",
        "description": "Executive, Legislative, and Other General Government Support"
    },
    {
        "code": "92111",
        "description": "Executive Offices"
    },
    {
        "code": "921110",
        "description": "Executive Offices"
    },
    {
        "code": "92112",
        "description": "Legislative Bodies"
    },
    {
        "code": "921120",
        "description": "Legislative Bodies"
    },
    {
        "code": "92113",
        "description": "Public Finance Activities"
    },
    {
        "code": "921130",
        "description": "Public Finance Activities"
    },
    {
        "code": "92114",
        "description": "Executive and Legislative Offices, Combined"
    },
    {
        "code": "921140",
        "description": "Executive and Legislative Offices, Combined"
    },
    {
        "code": "92115",
        "description": "American Indian and Alaska Native Tribal Governments"
    },
    {
        "code": "921150",
        "description": "American Indian and Alaska Native Tribal Governments"
    },
    {
        "code": "92119",
        "description": "Other General Government Support"
    },
    {
        "code": "921190",
        "description": "Other General Government Support"
    },
    {
        "code": "922",
        "description": "Justice, Public Order, and Safety Activities"
    },
    {
        "code": "9221",
        "description": "Justice, Public Order, and Safety Activities"
    },
    {
        "code": "92211",
        "description": "Courts"
    },
    {
        "code": "922110",
        "description": "Courts"
    },
    {
        "code": "92212",
        "description": "Police Protection"
    },
    {
        "code": "922120",
        "description": "Police Protection"
    },
    {
        "code": "92213",
        "description": "Legal Counsel and Prosecution"
    },
    {
        "code": "922130",
        "description": "Legal Counsel and Prosecution"
    },
    {
        "code": "92214",
        "description": "Correctional Institutions"
    },
    {
        "code": "922140",
        "description": "Correctional Institutions"
    },
    {
        "code": "92215",
        "description": "Parole Offices and Probation Offices"
    },
    {
        "code": "922150",
        "description": "Parole Offices and Probation Offices"
    },
    {
        "code": "92216",
        "description": "Fire Protection"
    },
    {
        "code": "922160",
        "description": "Fire Protection"
    },
    {
        "code": "92219",
        "description": "Other Justice, Public Order, and Safety Activities"
    },
    {
        "code": "922190",
        "description": "Other Justice, Public Order, and Safety Activities"
    },
    {
        "code": "923",
        "description": "Administration of Human Resource Programs"
    },
    {
        "code": "9231",
        "description": "Administration of Human Resource Programs"
    },
    {
        "code": "92311",
        "description": "Administration of Education Programs"
    },
    {
        "code": "923110",
        "description": "Administration of Education Programs"
    },
    {
        "code": "92312",
        "description": "Administration of Public Health Programs"
    },
    {
        "code": "923120",
        "description": "Administration of Public Health Programs"
    },
    {
        "code": "92313",
        "description": "Administration of Human Resource Programs (except Education, Public Health, and Veterans' Affairs Programs)"
    },
    {
        "code": "923130",
        "description": "Administration of Human Resource Programs (except Education, Public Health, and Veterans' Affairs Programs)"
    },
    {
        "code": "92314",
        "description": "Administration of Veterans' Affairs"
    },
    {
        "code": "923140",
        "description": "Administration of Veterans' Affairs"
    },
    {
        "code": "924",
        "description": "Administration of Environmental Quality Programs"
    },
    {
        "code": "9241",
        "description": "Administration of Environmental Quality Programs"
    },
    {
        "code": "92411",
        "description": "Administration of Air and Water Resource and Solid Waste Management Programs"
    },
    {
        "code": "924110",
        "description": "Administration of Air and Water Resource and Solid Waste Management Programs"
    },
    {
        "code": "92412",
        "description": "Administration of Conservation Programs"
    },
    {
        "code": "924120",
        "description": "Administration of Conservation Programs"
    },
    {
        "code": "925",
        "description": "Administration of Housing Programs, Urban Planning, and Community Development"
    },
    {
        "code": "9251",
        "description": "Administration of Housing Programs, Urban Planning, and Community Development"
    },
    {
        "code": "92511",
        "description": "Administration of Housing Programs"
    },
    {
        "code": "925110",
        "description": "Administration of Housing Programs"
    },
    {
        "code": "92512",
        "description": "Administration of Urban Planning and Community and Rural Development"
    },
    {
        "code": "925120",
        "description": "Administration of Urban Planning and Community and Rural Development"
    },
    {
        "code": "926",
        "description": "Administration of Economic Programs"
    },
    {
        "code": "9261",
        "description": "Administration of Economic Program"
    },
    {
        "code": "92611",
        "description": "Administration of General Economic Programs"
    },
    {
        "code": "926110",
        "description": "Administration of General Economic Programs"
    },
    {
        "code": "92612",
        "description": "Regulation and Administration of Transportation Programs"
    },
    {
        "code": "926120",
        "description": "Regulation and Administration of Transportation Programs"
    },
    {
        "code": "92613",
        "description": "Regulation and Administration of Communications, Electric, Gas, and Other Utilities"
    },
    {
        "code": "926130",
        "description": "Regulation and Administration of Communications, Electric, Gas, and Other Utilities"
    },
    {
        "code": "92614",
        "description": "Regulation of Agricultural Marketing and Commodities"
    },
    {
        "code": "926140",
        "description": "Regulation of Agricultural Marketing and Commodities"
    },
    {
        "code": "92615",
        "description": "Regulation, Licensing, and Inspection of Miscellaneous Commercial Sectors"
    },
    {
        "code": "926150",
        "description": "Regulation, Licensing, and Inspection of Miscellaneous Commercial Sectors"
    },
    {
        "code": "927",
        "description": "Space Research and Technology"
    },
    {
        "code": "9271",
        "description": "Space Research and Technology"
    },
    {
        "code": "92711",
        "description": "Space Research and Technology"
    },
    {
        "code": "927110",
        "description": "Space Research and Technology"
    },
    {
        "code": "928",
        "description": "National Security and International Affairs"
    },
    {
        "code": "9281",
        "description": "National Security and International Affairs"
    },
    {
        "code": "92811",
        "description": "National Security"
    },
    {
        "code": "928110",
        "description": "National Security"
    },
    {
        "code": "92812",
        "description": "International Affairs"
    },
    {
        "code": "928120",
        "description": "International Affairs"
    },
    {
        "code": "31",
        "description": "Manufacturing"
    },
    {
        "code": "32",
        "description": "Manufacturing"
    },
    {
        "code": "33",
        "description": "Manufacturing"
    },
    {
        "code": "44",
        "description": "Retail Trade"
    },
    {
        "code": "45",
        "description": "Retail Trade"
    },
    {
        "code": "48",
        "description": "Transportation and Warehousing"
    },
    {
        "code": "49",
        "description": "Transportation and Warehousing"
    }
].sort();
_.each(naics, function(naic){
    naic["type"] = "NAICS"
});
var headers = {};

var useAuth = function(authValue, type, cb, event, host, basePath){
    console.log("host="+host);
    console.log("EVENT = ", event);

    headers[type] = authValue;
    var isLoggedInOptions = {
        host: host,
        port: 443,
        path: basePath + '/prospector/v1/user/loggedin',
        method: 'GET',
        headers: headers,
        logResponse: false
    };
    return PromiseRequest(isLoggedInOptions, null)
        .bind(this)
        .then(function(isLoggedInResp){
            var response = [];
            if(isLoggedInResp.body.status == 100){
                return new Promise(function(resolve, reject){
                    try{
                        var pageSize = 20;
                        var query = JSON.parse(event.body).query.toLowerCase();
                        console.log("query=" + query);
                        var filter = "";
                        if(query.indexOf(":") > -1){
                            var codes = query.split(":");
                            if(codes[0] == "sic"){
                                filter = "SIC";
                            } else if(codes[0] == "naics"){
                                filter = "NAICS";
                            }
                            if(filter != ""){
                                query = codes[1];
                            }
                        }else if(query == ""){
                            query = "11";
                        }

                        var exactSics = [];
                        var cSics = [];
                        var exactNaics = [];
                        var cNaics = [];


                        if(query != ""){
                            if (!isNaN(query)) {

                                if(filter == "" || filter =="SIC"){
                                    exactSics = _.filter(sics, function(sic){
                                        return sic.code == query;
                                    });
                                    cSics = _.filter(sics, function(sic){
                                        return sic.code.indexOf(query) == 0  && sic.code.length > query.length;
                                    });
                                }

                                if(filter == "" || filter =="NAICS") {
                                    exactNaics = _.filter(naics, function (naic) {
                                        return naic.code == query;
                                    });
                                    cNaics = _.filter(naics, function (naic) {
                                        return naic.code.indexOf(query) == 0 && naic.code.length > query.length;
                                    });
                                }
                                response = exactSics.concat(exactNaics);
                                response = response.concat(cSics);
                                response = response.concat(cNaics);
                                resolve(response);
                            } else {
                                exactSics = _.filter(sics, function(sic){
                                    return sic.description.toLowerCase().indexOf(query) > -1;
                                });
                                exactNaics = _.filter(naics, function(naic){
                                    return naic.description.toLowerCase().indexOf(query) > -1;
                                });
                                response = exactSics.concat(exactNaics);
                                resolve(response);
                            }

                        } else {
                            var response = sics.splice(1, Math.floor(pageSize/2));
                            response = response.concat(naics.splice(1, Math.floor(pageSize/2)));
                            resolve(response);
                        }

                    } catch(err){
                        reject (err);
                    }

                }).then(function(response){
                    return cb(null, {"statusCode": 200, "body":JSON.stringify({codes: response})});

                }).catch(function(err){
                    console.log(err);
                    console.log(err.stack);
                    var errorResponse = createErrorMsg(-200, "ClassificationsSearch");
                    return cb(null, {"statusCode":400, "body":JSON.stringify(errorResponse)});
                });

            } else {
                var errorResponse = createErrorMsg(-300, "ClassificationsSearch");
                return cb(null, {"statusCode":400, "body":JSON.stringify(errorResponse)});
            }
        })
};

module.exports.handler = function (event, context, cb) {
    var stage = event.stageVariables.functionAlias;
    var host = config[stage].relProHost;
    var basePath = config[stage].relProBasePath;
    if (basePath == '/') basePath = '';

    var userToken = event.headers.userToken;
    var bearer = event.headers.Authorization;
    console.log("bearer =" + bearer);
    if (bearer != undefined && bearer != null && bearer != "") {
        console.log("a")
        useAuth(bearer, "Authorization", cb, event, host, basePath);
    } else if (userToken != undefined && userToken != null && userToken != "") {
        console.log("b")
        useAuth(userToken, "userToken", cb, event, host, basePath);
    } else {
        var errorResponse = createErrorMsg(-300, "ClassificationsSearch");
        return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
    }
};

