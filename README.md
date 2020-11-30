# Slime Racing

## Publish
`dotnet publish -c Release -r linux-x64 --self-contained false -o bin\Release\netcoreapp3.1\SlimeRacingPublisher`
`dotnet publish -c Debug -r linux-x64 --self-contained false -o bin\Release\netcoreapp3.1\SlimeRacingPublisher`


## Prerequisites

* [.NET Core](https://www.microsoft.com/net/download/windows) >= 3.1
* Your favourite editor (I prefer [VS Code](https://code.visualstudio.com/)), or VS 2017/19

## Status Code

Standard Code | Description            | Note 
:------------:| ---------------------- |-----:
200           | OK, Success            |   
400           | Bad request            |   
401           | Unauthorized           |
403           | Forbidden              |
404           | Not Found              |
405           | Method Not Allowed     |
408           | Request Timeout        |
415           | Unsupported Media Type |
500           | Internal Server Error  |
502           | Bad Gateway            |
503           | Service Unavailable    |




Custom Code   | Description                 | Note  
:------------:| --------------------------- |-----:
601           | Account Exists              |   
602           | Account Not Found           |   
603           | Password Incorrect          |
604           | Account Inactive            |
605           | Register Error              |
606           | Update Password Fail        |
607           | Account Update Fail         |
608           | Get Auth Token Error        |
609           | Get External Token Error    |
610           |     |
611           | Member Not Found            |
612           | Member Update Fail          |
613           | Member Inactive             |
614           | Member Validation Error     |
621           | Corporation Not Found       |

651           | Product Not Found           |
652           | Product Inactive            |
653           | Product Quantity Changed    |
701           | Create Order Fail           |
702           | Update Order Fail           |
703           | Order Not Found             |
704           | Parse Order Number Error    |
705           | Return Code Incorrect       |
706           | Validation Code Error       |
707           | Simulate Paid               |
708           | Total Amount Error          |
709           | Payment Prohibition         |
710           |                             |
711           |     |
712           |     |
713           |     |
721           | Cart Not Found              |
722           | Add Item Fail               |
723           | Remove Item Fail            |
724           | Cart Provider ID Error      |
725           | Calculate Failed            |
726           | Not Found Payments          |
727           | Not Found Shippings         |
728           | Not Found Selected Payment  |
729           | Not Found Selected Shipping |
730           | Checkout Fail               |
731           |  |
741           | Coupon Not Found            |

901           | Parameter Incorrect         |
902           | Operation Refused           |
903           | Operation Error             |
904           |     |




## Menu Code
Code   | Name                  | Root
:-----:| ----------------------|:-----:
1      | Dashboard             | Y
11     | Authority             | Y
12     | Account               | N
13     | Member                | N
21     | Catalog               | Y
22     | Category              | N    
23     | Product               | N
31     | Order                 | Y
32     | AllOrder              | N
901    | System                | Y
902    | Menu                  | N
903    | Role                  | N