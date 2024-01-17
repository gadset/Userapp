Redux variables you can use : 
setModelValue , setDeviceValue, setIssueValue, setpartnerValue(Partnerdetails)

how to maintain two quote values from different number of quotes? maybe you can add a separate modal on clicking the 
quote which shows for all the prices from the array and selects one from it or not(their wish).

what if user's tab suddenly closed in the middle of the quotes - will he able to recover the previous quotes?

if thats the case, quotes should be always first come first serve basis.

/users/bidstodisplay -> have to change to orders to display
/users/SendQuote -> sending a quote and storing all the values in Quotes DB.
/users/quotesdashboard -> getting quotes for the device from the customers.


/steper1 - 4 components are binded - customize stepper to go to back page using a back button and if filled 
customer can also go forward using front button and make only three pages.
No four pages in stepper -- too much of the task.

/paymentnew has new api calls - 
'users/saveorder' - to save the current order betweeen partner and customer, so store it in customers orders and partners orders also.
 --- Orders db - all informaation , customer db - id of the order, PartnerDb - id of the Order
payment/success  - 
'payment/order'  - these two are integrations from the Razorpay.