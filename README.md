# IP Subnet Calculator

This project is a web application providing IP address subnet calculator.
![Screen Shot 2022-12-04 at 14 56 00](https://user-images.githubusercontent.com/6548931/205476876-5139e1cb-fcdb-4f67-8a24-3fc523accffe.png)

## Built with

[![React][react.js]][react-url]

## URL

## Functions

-   IP subnet calculator
-   Summarize IP addresses
-   Dark mode based on OS setting

![Screen Shot 2022-12-04 at 14 49 56](https://user-images.githubusercontent.com/6548931/205476818-8fb6dfdc-4fb4-43fd-ba9e-a4ffd6ffc695.png)

Support both IPv4 adn IPv6. There are 4 tabs below.

-   IPv4 subnet
-   IPv6 subnet
-   IPv4 summary
-   IPv6 summary

## Usage

### IPv4 subnet

This tab has the function of IPv4 subnet calculator.
Input an IPv4 address, select a subnet and press CALCULATE button, then return the following values.

-   IP address  
    Show the input address and selected subnet
-   Network address
-   Number of hosts  
    Show the number of hosts. This number is excluding the network address and broadcast address.
-   Broadcast address
-   Subnet mask
-   IP type  
    Show the IP type, private or public
-   Network class  
    Show the network class, A, B, C, D and E
-   IPv4 mapped address  
    Show the IPv4 mapped address based on RFC4291 section 2.5.5.2, for the usage refer to RFC4038
-   6to4 prefix
    Show the 6to4 prefix based on RFC3056

### IPv6 subnet

This tab has the function of IPv6 subnet calculator.
Input an IPv6 address, select a subnet and select SHORT or LONG. The SHORT and LONG is to change the representation below.

-   SHORT  
    Shorten the IPv6 address as much as possible based on RFC5952
-   LONG  
    Show the full length IPv6 address.

After input above values and press CALCULATE button, return the following values.

-   IP address  
    Show the input address and selected subnet
-   Network type
    Show the network type, Multicast, Link-Local Unicast, Global Unicast, Unspecified or Loopback
-   IP address range
-   Number of hosts

### IPv4 summary

This tab has the function of summarizing IPv4 addresses. Minimum 2 addresses and maximum 5 addresses can be summarized.
Input IPv4 addresses, select subnets and press CALCULATE button, then return a summarized IP address, which as small range of addresses as possible.

### IPv6 summary

This tab has the function of summarizing IPv6 addresses. Minimum 2 addresses and maximum 5 addresses can be summarized.
Input IPv4 addresses, select subnets, select SHORT or LONG and press CALCULATE button, then return a summarized IP address, which as small range of addresses as possible. The SHORT and LONG is to change the representation below, the same as IPv6 subnet.

-   SHORT  
    Shorten the IPv6 address as much as possible based on RFC5952
-   LONG  
    Show the full length IPv6 address.

## Limitation

-   Not support responsive web design
-   Maximum 5 addresses for summary
-   Not support local storage

## Roadmap

-   Responsive web design
-   Switch dark mode button
-   Copy button for outputs
-   Local storage

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
