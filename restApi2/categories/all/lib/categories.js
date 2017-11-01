var categories = [
    {
        "categoryId": 1,
        "name": "Cloud Services",
        "parentCategoryId": null
    },
    {
        "categoryId": 2,
        "name": "Communications Technologies",
        "parentCategoryId": null
    },
    {
        "categoryId": 3,
        "name": "Customer Relationship Management",
        "parentCategoryId": null
    },
    {
        "categoryId": 4,
        "name": "Data Center Solutions",
        "parentCategoryId": null
    },
    {
        "categoryId": 5,
        "name": "Enterprise Applications",
        "parentCategoryId": null
    },
    {
        "categoryId": 6,
        "name": "Enterprise Content",
        "parentCategoryId": null
    },
    {
        "categoryId": 7,
        "name": "Hardware (Basic)",
        "parentCategoryId": null
    },
    {
        "categoryId": 8,
        "name": "IT Governance",
        "parentCategoryId": null
    },
    {
        "categoryId": 9,
        "name": "Marketing Performance Management",
        "parentCategoryId": null
    },
    {
        "categoryId": 10,
        "name": "Network Computing",
        "parentCategoryId": null
    },
    {
        "categoryId": 11,
        "name": "Productivity Solutions",
        "parentCategoryId": null
    },
    {
        "categoryId": 12,
        "name": "Project Management",
        "parentCategoryId": null
    },
    {
        "categoryId": 13,
        "name": "Software (Basic)",
        "parentCategoryId": null
    },
    {
        "categoryId": 14,
        "name": "Vertical Markets",
        "parentCategoryId": null
    },
    {
        "categoryId": 15,
        "name": "Web-Oriented Architecture",
        "parentCategoryId": null
    },
    {
        "categoryId": 16,
        "name": "Academic & Education Management Software",
        "parentCategoryId": 14,
        "numberCompanies": 9412,
        "numberVendors": 29,
        "numberProducts": 45
    },
    {
        "categoryId": 17,
        "name": "Application Development & Management",
        "parentCategoryId": 8,
        "numberCompanies": 195858,
        "numberVendors": 77,
        "numberProducts": 156
    },
    {
        "categoryId": 18,
        "name": "Asset Performance Management",
        "parentCategoryId": 8,
        "numberCompanies": 6499,
        "numberVendors": 35,
        "numberProducts": 45
    },
    {
        "categoryId": 19,
        "name": "Automated Process/Workflow Systems",
        "parentCategoryId": 10,
        "numberCompanies": 6590,
        "numberVendors": 17,
        "numberProducts": 25
    },
    {
        "categoryId": 20,
        "name": "Business Intelligence",
        "parentCategoryId": 9,
        "numberCompanies": 29088,
        "numberVendors": 74,
        "numberProducts": 106
    },
    {
        "categoryId": 21,
        "name": "Business Process Management (BPM)",
        "parentCategoryId": 5,
        "numberCompanies": 11206,
        "numberVendors": 37,
        "numberProducts": 55
    },
    {
        "categoryId": 22,
        "name": "Case Management",
        "parentCategoryId": 6,
        "numberCompanies": 579,
        "numberVendors": 9,
        "numberProducts": 10
    },
    {
        "categoryId": 23,
        "name": "Change Management",
        "parentCategoryId": 8,
        "numberCompanies": 4404,
        "numberVendors": 17,
        "numberProducts": 31
    },
    {
        "categoryId": 24,
        "name": "Cloud Infrastructure Computing",
        "parentCategoryId": 1,
        "numberCompanies": 30968,
        "numberVendors": 79,
        "numberProducts": 103
    },
    {
        "categoryId": 25,
        "name": "Collaboration",
        "parentCategoryId": 11,
        "numberCompanies": 45853,
        "numberVendors": 40,
        "numberProducts": 61
    },
    {
        "categoryId": 26,
        "name": "Commerce",
        "parentCategoryId": 5,
        "numberCompanies": 28292,
        "numberVendors": 112,
        "numberProducts": 125
    },
    {
        "categoryId": 27,
        "name": "Communications Technology",
        "parentCategoryId": 2,
        "numberCompanies": 24783,
        "numberVendors": 32,
        "numberProducts": 55
    },
    {
        "categoryId": 28,
        "name": "Construction",
        "parentCategoryId": 14,
        "numberCompanies": 7373,
        "numberVendors": 34,
        "numberProducts": 39
    },
    {
        "categoryId": 29,
        "name": "Consumer Electronics, Personal Computers & Software",
        "parentCategoryId": 7,
        "numberCompanies": 59994,
        "numberVendors": 18,
        "numberProducts": 52
    },
    {
        "categoryId": 30,
        "name": "Contact Center Management",
        "parentCategoryId": 3,
        "numberCompanies": 6213,
        "numberVendors": 42,
        "numberProducts": 63
    },
    {
        "categoryId": 31,
        "name": "Customer Order Management",
        "parentCategoryId": 3,
        "numberCompanies": 1831,
        "numberVendors": 10,
        "numberProducts": 16
    },
    {
        "categoryId": 32,
        "name": "Customer Relationship Management (CRM)",
        "parentCategoryId": 3,
        "numberCompanies": 58534,
        "numberVendors": 69,
        "numberProducts": 87
    },
    {
        "categoryId": 33,
        "name": "Data Archiving, Back-Up & Recovery",
        "parentCategoryId": 4,
        "numberCompanies": 21541,
        "numberVendors": 60,
        "numberProducts": 110
    },
    {
        "categoryId": 34,
        "name": "Data Management & Storage (Hardware)",
        "parentCategoryId": 4,
        "numberCompanies": 17200,
        "numberVendors": 50,
        "numberProducts": 173
    },
    {
        "categoryId": 35,
        "name": "Database Management Software",
        "parentCategoryId": 4,
        "numberCompanies": 136942,
        "numberVendors": 87,
        "numberProducts": 180
    },
    {
        "categoryId": 36,
        "name": "Design & Publishing",
        "parentCategoryId": 11,
        "numberCompanies": 28920,
        "numberVendors": 13,
        "numberProducts": 20
    },
    {
        "categoryId": 37,
        "name": "Disaster Recovery (DR)",
        "parentCategoryId": 4,
        "numberCompanies": 4586,
        "numberVendors": 24,
        "numberProducts": 32
    },
    {
        "categoryId": 38,
        "name": "Document Management",
        "parentCategoryId": 6,
        "numberCompanies": 20498,
        "numberVendors": 63,
        "numberProducts": 71
    },
    {
        "categoryId": 39,
        "name": "Electronic Data Interchange (EDI)",
        "parentCategoryId": 10,
        "numberCompanies": 2047,
        "numberVendors": 17,
        "numberProducts": 22
    },
    {
        "categoryId": 40,
        "name": "Electronic Design Automation (EDA)",
        "parentCategoryId": 13,
        "numberCompanies": 6454,
        "numberVendors": 9,
        "numberProducts": 9
    },
    {
        "categoryId": 41,
        "name": "Email",
        "parentCategoryId": 2,
        "numberCompanies": 64090,
        "numberVendors": 35,
        "numberProducts": 42
    },
    {
        "categoryId": 42,
        "name": "Enterprise Business Solutions (EBS)",
        "parentCategoryId": 5,
        "numberCompanies": 45870,
        "numberVendors": 20,
        "numberProducts": 31
    },
    {
        "categoryId": 43,
        "name": "Enterprise Content Management (ECM)",
        "parentCategoryId": 6,
        "numberCompanies": 16423,
        "numberVendors": 43,
        "numberProducts": 59
    },
    {
        "categoryId": 44,
        "name": "Enterprise Learning",
        "parentCategoryId": 11,
        "numberCompanies": 6707,
        "numberVendors": 18,
        "numberProducts": 20
    },
    {
        "categoryId": 45,
        "name": "Enterprise Performance Management (EPM)",
        "parentCategoryId": 5,
        "numberCompanies": 11399,
        "numberVendors": 24,
        "numberProducts": 28
    },
    {
        "categoryId": 46,
        "name": "Enterprise Resource Planning (ERP)",
        "parentCategoryId": 5,
        "numberCompanies": 77264,
        "numberVendors": 49,
        "numberProducts": 107
    },
    {
        "categoryId": 47,
        "name": "Financial Analytical Applications",
        "parentCategoryId": 5,
        "numberCompanies": 102630,
        "numberVendors": 69,
        "numberProducts": 117
    },
    {
        "categoryId": 48,
        "name": "Governance Risk Compliance (GRC)",
        "parentCategoryId": 8,
        "numberCompanies": 5875,
        "numberVendors": 51,
        "numberProducts": 67
    },
    {
        "categoryId": 49,
        "name": "Hardware - Other",
        "parentCategoryId": 7,
        "numberCompanies": 7593,
        "numberVendors": 19,
        "numberProducts": 20
    },
    {
        "categoryId": 50,
        "name": "Help Desk Management",
        "parentCategoryId": 3,
        "numberCompanies": 8964,
        "numberVendors": 24,
        "numberProducts": 27
    },
    {
        "categoryId": 51,
        "name": "HR Management Systems (HRMS)/Human Capital Management (HCM)",
        "parentCategoryId": 5,
        "numberCompanies": 63474,
        "numberVendors": 131,
        "numberProducts": 200
    },
    {
        "categoryId": 52,
        "name": "Hypervisor",
        "parentCategoryId": 15,
        "numberCompanies": 25716,
        "numberVendors": 4,
        "numberProducts": 14
    },
    {
        "categoryId": 53,
        "name": "Information Technology Management",
        "parentCategoryId": 6,
        "numberCompanies": 6286,
        "numberVendors": 13,
        "numberProducts": 15
    },
    {
        "categoryId": 54,
        "name": "Infrastructure as a Service (IaaS)",
        "parentCategoryId": 1,
        "numberCompanies": 1526,
        "numberVendors": 23,
        "numberProducts": 25
    },
    {
        "categoryId": 55,
        "name": "Inventory Management",
        "parentCategoryId": 5,
        "numberCompanies": 2990,
        "numberVendors": 17,
        "numberProducts": 19
    },
    {
        "categoryId": 56,
        "name": "IT Infrastructure & Operations Management",
        "parentCategoryId": 4,
        "numberCompanies": 30489,
        "numberVendors": 77,
        "numberProducts": 195
    },
    {
        "categoryId": 57,
        "name": "Lean/Kaizen/Value Stream Mapping",
        "parentCategoryId": 11,
        "numberCompanies": 94,
        "numberVendors": 3,
        "numberProducts": 3
    },
    {
        "categoryId": 58,
        "name": "Legal and Professional Services Management",
        "parentCategoryId": 14,
        "numberCompanies": 9843,
        "numberVendors": 35,
        "numberProducts": 56
    },
    {
        "categoryId": 59,
        "name": "Mainframe Computers",
        "parentCategoryId": 7,
        "numberCompanies": 3718,
        "numberVendors": 3,
        "numberProducts": 10
    },
    {
        "categoryId": 60,
        "name": "Manufacturing/Engineering",
        "parentCategoryId": 14,
        "numberCompanies": 11064,
        "numberVendors": 35,
        "numberProducts": 65
    },
    {
        "categoryId": 61,
        "name": "Marketing Performance Measurement",
        "parentCategoryId": 9,
        "numberCompanies": 71547,
        "numberVendors": 205,
        "numberProducts": 233
    },
    {
        "categoryId": 62,
        "name": "Media",
        "parentCategoryId": 14,
        "numberCompanies": 12762,
        "numberVendors": 21,
        "numberProducts": 34
    },
    {
        "categoryId": 63,
        "name": "Medical",
        "parentCategoryId": 14,
        "numberCompanies": 22009,
        "numberVendors": 168,
        "numberProducts": 261
    },
    {
        "categoryId": 64,
        "name": "Middleware Software",
        "parentCategoryId": 10,
        "numberCompanies": 21737,
        "numberVendors": 27,
        "numberProducts": 38
    },
    {
        "categoryId": 65,
        "name": "Midrange Computers",
        "parentCategoryId": 7,
        "numberCompanies": 14212,
        "numberVendors": 2,
        "numberProducts": 4
    },
    {
        "categoryId": 66,
        "name": "Mobile Enterprise Management",
        "parentCategoryId": 2,
        "numberCompanies": 4608,
        "numberVendors": 23,
        "numberProducts": 29
    },
    {
        "categoryId": 67,
        "name": "Mobile Technologies",
        "parentCategoryId": 2,
        "numberCompanies": 6244,
        "numberVendors": 17,
        "numberProducts": 17
    },
    {
        "categoryId": 68,
        "name": "Network Management (Hardware)",
        "parentCategoryId": 10,
        "numberCompanies": 26663,
        "numberVendors": 61,
        "numberProducts": 201
    },
    {
        "categoryId": 69,
        "name": "Network Management (Software)",
        "parentCategoryId": 10,
        "numberCompanies": 26033,
        "numberVendors": 55,
        "numberProducts": 109
    },
    {
        "categoryId": 70,
        "name": "Online Video Platform (OVP)",
        "parentCategoryId": 15,
        "numberCompanies": 8734,
        "numberVendors": 30,
        "numberProducts": 31
    },
    {
        "categoryId": 71,
        "name": "Operating Systems & Computing Languages",
        "parentCategoryId": 4,
        "numberCompanies": 184426,
        "numberVendors": 38,
        "numberProducts": 87
    },
    {
        "categoryId": 72,
        "name": "Partner Management",
        "parentCategoryId": 5,
        "numberCompanies": 1080,
        "numberVendors": 18,
        "numberProducts": 18
    },
    {
        "categoryId": 73,
        "name": "Philanthropic",
        "parentCategoryId": 14,
        "numberCompanies": 9031,
        "numberVendors": 5,
        "numberProducts": 11
    },
    {
        "categoryId": 74,
        "name": "Platform as a Service (PaaS)",
        "parentCategoryId": 1,
        "numberCompanies": 13176,
        "numberVendors": 22,
        "numberProducts": 23
    },
    {
        "categoryId": 75,
        "name": "Printers",
        "parentCategoryId": 7,
        "numberCompanies": 11478,
        "numberVendors": 14,
        "numberProducts": 63
    },
    {
        "categoryId": 76,
        "name": "Procurement",
        "parentCategoryId": 5,
        "numberCompanies": 1280,
        "numberVendors": 8,
        "numberProducts": 9
    },
    {
        "categoryId": 77,
        "name": "Product Lifecycle Management (PLM)",
        "parentCategoryId": 6,
        "numberCompanies": 8765,
        "numberVendors": 15,
        "numberProducts": 21
    },
    {
        "categoryId": 78,
        "name": "Productivity Solutions",
        "parentCategoryId": 11,
        "numberCompanies": 332516,
        "numberVendors": 18,
        "numberProducts": 39
    },
    {
        "categoryId": 79,
        "name": "Project Management",
        "parentCategoryId": 12,
        "numberCompanies": 10890,
        "numberVendors": 39,
        "numberProducts": 40
    },
    {
        "categoryId": 80,
        "name": "Project Portfolio Management (PPM)",
        "parentCategoryId": 12,
        "numberCompanies": 7885,
        "numberVendors": 31,
        "numberProducts": 33
    },
    {
        "categoryId": 81,
        "name": "Quality Management System",
        "parentCategoryId": 8,
        "numberCompanies": 19640,
        "numberVendors": 32,
        "numberProducts": 41
    },
    {
        "categoryId": 82,
        "name": "Real Estate",
        "parentCategoryId": 14,
        "numberCompanies": 10346,
        "numberVendors": 34,
        "numberProducts": 36
    },
    {
        "categoryId": 83,
        "name": "Remote Computer/Server Solutions",
        "parentCategoryId": 15,
        "numberCompanies": 4619,
        "numberVendors": 12,
        "numberProducts": 18
    },
    {
        "categoryId": 84,
        "name": "Reporting Software",
        "parentCategoryId": 4,
        "numberCompanies": 27661,
        "numberVendors": 19,
        "numberProducts": 28
    },
    {
        "categoryId": 85,
        "name": "Retail",
        "parentCategoryId": 14,
        "numberCompanies": 6834,
        "numberVendors": 27,
        "numberProducts": 37
    },
    {
        "categoryId": 86,
        "name": "Search Engine",
        "parentCategoryId": 13,
        "numberCompanies": 8681,
        "numberVendors": 23,
        "numberProducts": 25
    },
    {
        "categoryId": 87,
        "name": "Security Information and Event Management (SIEM)",
        "parentCategoryId": 4,
        "numberCompanies": 7965,
        "numberVendors": 25,
        "numberProducts": 35
    },
    {
        "categoryId": 88,
        "name": "Server Technologies (Hardware)",
        "parentCategoryId": 7,
        "numberCompanies": 11824,
        "numberVendors": 15,
        "numberProducts": 82
    },
    {
        "categoryId": 89,
        "name": "Server Technologies (Software)",
        "parentCategoryId": 13,
        "numberCompanies": 59718,
        "numberVendors": 6,
        "numberProducts": 11
    },
    {
        "categoryId": 90,
        "name": "Service & Field Support Management",
        "parentCategoryId": 3,
        "numberCompanies": 5858,
        "numberVendors": 36,
        "numberProducts": 37
    },
    {
        "categoryId": 91,
        "name": "Social Media Systems",
        "parentCategoryId": 15,
        "numberCompanies": 14414,
        "numberVendors": 31,
        "numberProducts": 35
    },
    {
        "categoryId": 92,
        "name": "Software - Other",
        "parentCategoryId": 13,
        "numberCompanies": 29635,
        "numberVendors": 70,
        "numberProducts": 72
    },
    {
        "categoryId": 93,
        "name": "Software Configuration Management (SCM)",
        "parentCategoryId": 8,
        "numberCompanies": 10931,
        "numberVendors": 29,
        "numberProducts": 39
    },
    {
        "categoryId": 94,
        "name": "Supplier Relationship Management (SRM)",
        "parentCategoryId": 5,
        "numberCompanies": 3498,
        "numberVendors": 9,
        "numberProducts": 17
    },
    {
        "categoryId": 95,
        "name": "Supply Chain Management (SCM)",
        "parentCategoryId": 5,
        "numberCompanies": 9308,
        "numberVendors": 41,
        "numberProducts": 53
    },
    {
        "categoryId": 96,
        "name": "Sustainability/Green Enterprise",
        "parentCategoryId": 14,
        "numberCompanies": 576,
        "numberVendors": 13,
        "numberProducts": 15
    },
    {
        "categoryId": 97,
        "name": "System Analytics & Monitoring",
        "parentCategoryId": 4,
        "numberCompanies": 26110,
        "numberVendors": 52,
        "numberProducts": 64
    },
    {
        "categoryId": 98,
        "name": "System Security Services",
        "parentCategoryId": 4,
        "numberCompanies": 33645,
        "numberVendors": 163,
        "numberProducts": 281
    },
    {
        "categoryId": 99,
        "name": "Telephony",
        "parentCategoryId": 2,
        "numberCompanies": 12678,
        "numberVendors": 39,
        "numberProducts": 65
    },
    {
        "categoryId": 100,
        "name": "Travel and Expense Management",
        "parentCategoryId": 5,
        "numberCompanies": 8488,
        "numberVendors": 11,
        "numberProducts": 16
    },
    {
        "categoryId": 101,
        "name": "Virtualization: Application & Desktop",
        "parentCategoryId": 15,
        "numberCompanies": 32453,
        "numberVendors": 19,
        "numberProducts": 35
    },
    {
        "categoryId": 102,
        "name": "Virtualization: Platform Management",
        "parentCategoryId": 15,
        "numberCompanies": 44408,
        "numberVendors": 12,
        "numberProducts": 32
    },
    {
        "categoryId": 103,
        "name": "Virtualization: Server & Data Center",
        "parentCategoryId": 15,
        "numberCompanies": 20507,
        "numberVendors": 14,
        "numberProducts": 26
    },
    {
        "categoryId": 104,
        "name": "Visualization Software",
        "parentCategoryId": 11,
        "numberCompanies": 282325,
        "numberVendors": 78,
        "numberProducts": 161
    },
    {
        "categoryId": 105,
        "name": "Web & Portal Technology",
        "parentCategoryId": 15,
        "numberCompanies": 20531,
        "numberVendors": 55,
        "numberProducts": 62
    },
    {
        "categoryId": 106,
        "name": "Web Content Management System (WCMS)",
        "parentCategoryId": 15,
        "numberCompanies": 118074,
        "numberVendors": 57,
        "numberProducts": 71
    }
];

module.exports.subCategories = function() {
    return categories.filter(function(item) {
        if (item.parentCategoryId != null) {
            return true;
        } else {
            return false;
        }
    });

};

function filterParentCategories(obj) {
    if (obj.parentCategoryID != null) {
        return true;
    } else {
        return false;
    }
}

module.exports.filterByName = function (name) {
    return filterByName(name);
};

module.exports.cats = categories.filter(filterParentCategories);

function filterSubCategories(obj) {
    return obj.parentCategoryID == null;
}

module.exports.categoryDetails = function(categoryId) {
    console.log(categoryId);
    var result = categories.filter(function(item) {
        if (item.categoryId == parseInt(categoryId)) {
            return true;
        } else {
            return false;
        }
    });
    return result[0];

};
//module.exports.parentCategories = categories.filter(filterSubCategories);
module.exports.categories = categories;

