import { Shipment, ServiceDetail, FaqItem } from '../types';

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: "WE-771-420-DE",
    senderName: "Hans Schneider",
    senderAddress: "Ludwigstrasse 12, Munich, Germany",
    recipientName: "Kenji Sato",
    recipientAddress: "Chome-5-3 Shibakoen, Tokyo, Japan",
    weight: 12.5,
    type: "Standard",
    status: "In Transit",
    estimatedDelivery: "2026-06-18",
    source: "Munich (MUC)",
    destination: "Tokyo (NRT)",
    currentLocation: "Frankfurt Hub (FRA)",
    progress: 45,
    history: [
      {
        time: "2026-06-15 14:00",
        location: "Munich (MUC)",
        status: "Shipment Picked Up",
        description: "Package received at Munich fulfillment center and cleared initial screening.",
        iconType: "pickup"
      },
      {
        time: "2026-06-15 19:30",
        location: "Munich (MUC) Terminal 2",
        status: "Departed Origin Hub",
        description: "Sorted and dispatched via high-capacity terrestrial feeder.",
        iconType: "transit"
      },
      {
        time: "2026-06-16 08:30",
        location: "Frankfurt Hub (FRA)",
        status: "Arrived at sorting facility",
        description: "Arrived at modern sorting facility. Consolidated for long-haul air passage.",
        iconType: "transit"
      }
    ],
    temperatureControlled: false
  },
  {
    id: "WE-500-112-IN",
    senderName: "Esther Lim",
    senderAddress: "Marina Blvd Marina Bay, Singapore",
    recipientName: "Amelia Watson",
    recipientAddress: "Strand St, London, United Kingdom",
    weight: 4.2,
    type: "Express",
    status: "Customs",
    estimatedDelivery: "2026-06-16",
    source: "Singapore (SIN)",
    destination: "London (LHR)",
    currentLocation: "London Heathrow (LHR)",
    progress: 80,
    history: [
      {
        time: "2026-06-14 09:00",
        location: "Singapore Hub",
        status: "Picked Up by Concierge Courier",
        description: "Priority biometric hand-off complete.",
        iconType: "pickup"
      },
      {
        time: "2026-06-14 13:00",
        location: "Changi Air Freight Center",
        status: "Loaded onto Flight SQ-308",
        description: "Customs export clearance acquired. Loaded onto premium container.",
        iconType: "transit"
      },
      {
        time: "2026-06-15 06:15",
        location: "London Heathrow (LHR)",
        status: "Arrived In Country",
        description: "Landed at Heathrow and routed to consolidation center.",
        iconType: "transit"
      },
      {
        time: "2026-06-15 11:20",
        location: "London Heathrow (LHR) Customs Gate",
        status: "Under Customs Inspection",
        description: "Standard sovereign clearing procedures in progress.",
        iconType: "customs"
      }
    ],
    temperatureControlled: true
  },
  {
    id: "WE-883-991-US",
    senderName: "Alpha Retail Corp",
    senderAddress: "Lexington Ave, New York, NY, USA",
    recipientName: "Elena Rostova",
    recipientAddress: "Brienner Strasse 15, Munich, Germany",
    weight: 22.0,
    type: "COD Flow",
    status: "Delivered",
    estimatedDelivery: "2026-06-14",
    source: "New York (JFK)",
    destination: "Munich (MUC)",
    currentLocation: "Munich (MUC)",
    progress: 100,
    history: [
      {
        time: "2026-06-11 10:15",
        location: "New York Hub (JFK)",
        status: "Consolidated & Verified",
        description: "Goods cataloged and COD security protocols verified.",
        iconType: "pickup"
      },
      {
        time: "2026-06-12 04:30",
        location: "New York Hub (JFK)",
        status: "Departed Facility",
        description: "Dispatched on transatlantic freight line.",
        iconType: "transit"
      },
      {
        time: "2026-06-13 15:45",
        location: "Munich Hub (MUC)",
        status: "Arrived at Destination Facility",
        description: "Sorted and placed on delivery van line.",
        iconType: "transit"
      },
      {
        time: "2026-06-14 09:30",
        location: "Munich, Germany",
        status: "Out for Delivery",
        description: "Courier assigned with premium terminal for instant COD payment clearance.",
        iconType: "out_for_delivery"
      },
      {
        time: "2026-06-14 11:15",
        location: "Munich, Germany",
        status: "Delivered & COD Remitted",
        description: "Delivered with signature. Cashless payment successfully received and instant ledger bank settlement processed.",
        iconType: "delivered"
      }
    ],
    isCod: true,
    codAmount: 1850.0,
    codStatus: "Remitted",
    temperatureControlled: false
  },
  {
    id: "WE-220-305-FR",
    senderName: "Boutique Lafayette",
    senderAddress: "Boulevard Haussmann, Paris, France",
    recipientName: "Maison Luxury",
    recipientAddress: "Nanjing West Road, Shanghai, China",
    weight: 48.3,
    type: "Inventory",
    status: "Out for Delivery",
    estimatedDelivery: "2026-06-15",
    source: "Paris (CDG)",
    destination: "Shanghai (PVG)",
    currentLocation: "Shanghai Pudong Hub",
    progress: 95,
    history: [
      {
        time: "2026-06-12 11:00",
        location: "Paris CDG Inventory Depo",
        status: "Sourced and Sealed",
        description: "High-value luxury stock counted, biometric chain initiated.",
        iconType: "pickup"
      },
      {
        time: "2026-06-13 14:00",
        location: "Paris CDG Airport",
        status: "Dispatched overseas",
        description: "Secured cargo transit container loaded on priority flight.",
        iconType: "transit"
      },
      {
        time: "2026-06-14 20:10",
        location: "Shanghai PVG Terminal",
        status: "Cleared customs",
        description: "Customs procedures expedited. Transferred to smart warehouse.",
        iconType: "customs"
      },
      {
        time: "2026-06-15 08:00",
        location: "Shanghai Pudong Hub",
        status: "Dispatched on specialized final-mile truck",
        description: "Courier assigned with climate logs validated.",
        iconType: "out_for_delivery"
      }
    ],
    temperatureControlled: true
  }
];

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    id: "standard",
    title: "Standard",
    tagline: "Reliable Global Shipping",
    description: "Reliable global shipping with consistent transit times and full insurance coverage. Best for balanced freight flow schedules.",
    features: [
      "Transit time tracking",
      "Comprehensive loss & damage insurance coverage",
      "Premium customer service contact lines",
      "Full digital customs paperwork automation"
    ],
    ratePerKg: 4.5,
    avgLeadTime: "5-7 Business Days",
    bgHex: "#1e1e20"
  },
  {
    id: "express",
    title: "Express",
    tagline: "Urgent Priority Logistics",
    description: "High-priority shipping for urgent parcels. Next-day delivery to major global hubs with dedicated space guarantees.",
    features: [
      "Expedited air carrier prioritizing",
      "First-on, first-off handling",
      "Guaranteed delivery dates",
      "Active SMS & digital push status updates"
    ],
    ratePerKg: 12.0,
    avgLeadTime: "1-2 Business Days",
    bgHex: "#1e1e20"
  },
  {
    id: "cod_flow",
    title: "COD Flow",
    tagline: "Cash on Delivery",
    description: "Secure cash on delivery solutions with instant digital remittance for international and regional merchants.",
    features: [
      "Cashless tap-to-pay terminals on delivery",
      "Instant merchant bank account settlement",
      "High-value parcel custody escorts",
      "Full tracking with transaction slip automation"
    ],
    ratePerKg: 8.5,
    avgLeadTime: "3-5 Business Days",
    bgHex: "#1e1e20"
  },
  {
    id: "inventory",
    title: "Inventory",
    tagline: "Climate-Controlled Storage",
    description: "Climate-controlled, tech-enabled storage facilities with real-time stock management and last-mile fulfillment infrastructure.",
    features: [
      "Rigid humidity & temperature logging",
      "Direct API links with top ERP portals",
      "Dedicated secure micro-fulfillment lockers",
      "Real-time visual warehouse stock auditing"
    ],
    ratePerKg: 6.0,
    avgLeadTime: "2-4 Business Days",
    bgHex: "#1e1e20"
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "How does the Concierge Service work?",
    answer: "Our Concierge Service provides first-class logistics. Every shipment is assigned a dedicated logistics advocate who oversees routing optimizations, coordinates sovereign customs procedures, logs biometric custody exchanges, and acts as your direct contact. This ensures high-fidelity personal assistance for high-value items."
  },
  {
    id: "faq-2",
    question: "Do you offer temperature-controlled shipping?",
    answer: "Yes, our Inventory and Express fleets are equipped with specialized active climate containers. We continuously log heat and humidity parameters. Customers can track real-time transit temperatures directly through our smart dashboard, with active threshold alerts linked to cellular control gates."
  },
  {
    id: "faq-3",
    question: "What are the weight limits for global shipping?",
    answer: "For standard courier routes, parcel limits are 70 kg (154 lbs) per piece. For industrial freight, our logistics solutions accommodate palletized cargo up to 2,500 kg per booking. Please contact our Sales division directly using the form below to coordinate heavy heavy-lift charter transport."
  }
];
