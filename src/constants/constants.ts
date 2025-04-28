type Stock = {
  symbol: string;
  price: number;
  short_name: string;
  long_name: string;
  quantity: number;
  timestamp: Date;
  // date: Date;
};

export const stocksData: Stock[] = [
  {
    symbol: "AAPL",
    short_name: "Apple",
    long_name: "Apple Inc.",
    price: 182.52,
    quantity: 100,
    timestamp: new Date("2023-04-15"),
    // date: new Date("2023-04-15"),
  },
  {
    symbol: "MSFT", 
    short_name: "Microsoft",
    long_name: "Microsoft Corporation",
    price: 417.88,
    quantity: 50,
    timestamp: new Date("2023-05-22"),
    // date: new Date("2023-05-22"),
  },
  {
    symbol: "GOOGL",
    short_name: "Alphabet",
    long_name: "Alphabet Inc.",
    price: 175.09,
    quantity: 75,
    timestamp: new Date("2023-06-10"),
    // date: new Date("2023-06-10"),
  },
  {
    symbol: "AMZN",
    short_name: "Amazon",
    long_name: "Amazon.com, Inc.",
    price: 182.41,
    quantity: 60,
    timestamp: new Date("2023-07-05"),
    // date: new Date("2023-07-05"),
  },
  {
    symbol: "META",
    short_name: "Meta",
    long_name: "Meta Platforms, Inc.",
    price: 474.99,
    quantity: 40,
    timestamp: new Date("2023-08-18"),
    // date: new Date("2023-08-18"),
  },
  {
    symbol: "TSLA",
    short_name: "Tesla",
    long_name: "Tesla, Inc.",
    price: 175.34,
    quantity: 90,
    timestamp: new Date("2023-09-30"),
    // date: new Date("2023-09-30"),
  },
  {
    symbol: "NVDA",
    short_name: "NVIDIA",
    long_name: "NVIDIA Corporation",
    price: 950.02,
    quantity: 30,
    timestamp: new Date("2023-10-12"),
    // date: new Date("2023-10-12"),
  },
  {
    symbol: "BRK.B",
    short_name: "Berkshire Hathaway",
    long_name: "Berkshire Hathaway Inc.",
    price: 408.71,
    quantity: 25,
    timestamp: new Date("2023-11-25"),
    // date: new Date("2023-11-25"),
  },
  {
    symbol: "JPM",
    short_name: "JPMorgan Chase",
    long_name: "JPMorgan Chase & Co.",
    price: 198.87,
    quantity: 80,
    timestamp: new Date("2023-12-08"),
    // date: new Date("2023-12-08"),
  },
  {
    symbol: "V",
    short_name: "Visa",
    long_name: "Visa Inc.",
    price: 275.96,
    quantity: 70,
    timestamp: new Date("2024-01-20"),
    // date: new Date("2024-01-20"),
  },
  {
    symbol: "WMT",
    short_name: "Walmart",
    long_name: "Walmart Inc.",
    price: 59.98,
    quantity: 120,
    timestamp: new Date("2023-04-05"),
    // date: new Date("2023-04-05"),
  },
  {
    symbol: "JNJ",
    short_name: "Johnson & Johnson",
    long_name: "Johnson & Johnson",
    price: 152.5,
    quantity: 45,
    timestamp: new Date("2023-05-12"),
    // date: new Date("2023-05-12"),
  },
  {
    symbol: "PG",
    short_name: "Procter & Gamble",
    long_name: "Procter & Gamble Co.",
    price: 162.25,
    quantity: 65,
    timestamp: new Date("2023-06-22"),
    // date: new Date("2023-06-22"),
  },
  {
    symbol: "UNH",
    short_name: "UnitedHealth Group",
    long_name: "UnitedHealth Group Inc.",
    price: 490.1,
    quantity: 35,
    timestamp: new Date("2023-07-15"),
    // date: new Date("2023-07-15"),
  },
  {
    symbol: "HD",
    short_name: "Home Depot",
    long_name: "Home Depot Inc.",
    price: 345.75,
    quantity: 55,
    timestamp: new Date("2023-08-08"),
    // date: new Date("2023-08-08"),
  },
  {
    symbol: "BAC",
    short_name: "Bank of America",
    long_name: "Bank of America Corp.",
    price: 38.45,
    quantity: 110,
    timestamp: new Date("2023-09-19"),
    // date: new Date("2023-09-19"),
  },
  {
    symbol: "PFE",
    short_name: "Pfizer",
    long_name: "Pfizer Inc.",
    price: 27.2,
    quantity: 95,
    timestamp: new Date("2023-10-30"),
    // date: new Date("2023-10-30"),
  },
  {
    symbol: "CSCO",
    short_name: "Cisco",
    long_name: "Cisco Systems Inc.",
    price: 49.87,
    quantity: 85,
    timestamp: new Date("2023-11-14"),
    // date: new Date("2023-11-14"),
  },
  {
    symbol: "KO",
    short_name: "Coca-Cola",
    long_name: "Coca-Cola Co.",
    price: 60.15,
    quantity: 130,
    timestamp: new Date("2023-12-21"),
    // date: new Date("2023-12-21"),
  },
  {
    symbol: "DIS",
    short_name: "Walt Disney",
    long_name: "Walt Disney Co.",
    price: 111.95,
    quantity: 75,
    timestamp: new Date("2024-01-10"),
    // date: new Date("2024-01-10"),
  },
];

type Solicitud = {
  symbol: string;
  name: string;
  price: number;
  quantity: number;
  operation: "BUY" | "SELL";
  date: Date;
  status: "ACCEPTED" | "REJECTED" | "OK" | "error";
};

export const solicitudesData: Solicitud[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.52,
    quantity: 100,
    date: new Date("2023-04-15"),
    operation: "BUY",
    status: "ACCEPTED",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 417.88,
    quantity: 50,
    date: new Date("2023-05-22"),
    operation: "SELL",
    status: "REJECTED",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 175.09,
    quantity: 75,
    date: new Date("2023-06-10"),
    operation: "BUY",
    status: "OK",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 182.41,
    quantity: 60,
    date: new Date("2023-07-05"),
    operation: "SELL",
    status: "error",
  },
];
