import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const StripePayment = () => {
    const { id } = useParams();
    const {token} = useSelector((state) => state.auth);


    const addingDetails = async () => {
        try {
            console.log(`Requesting with id: ${id} and token: ${token}}`);
            const response = await axios.post(
            `${BASE_URL}/concert/register-for-concert/${id}`,
              {},
            {
                withCredentials:true ,
            }
            );
    
            
            console.log("heeloooooo") ;
            // toast.success("Data updated successfully");
            console.log("Response data buy  concert: - >> ", response.data);
            
            if ( response?.data?.success )
                await makePayment() ;
        } catch (error) {
            console.error("Error in adding details:", error.message);
            toast.error("All ready you have registered ");
        }
        };
        

        const makePayment = async () => {
            try {
              const stripe = await loadStripe(
                "pk_test_51QJ5RTAI8xVNoO7TqaukjHHfkOi5Nj0OPYYTToUwQkjukxrZ3RH0QZ92gH1bvqyUlxevQAz0hIHqkSomC1FFrPtQ00CCVZnGM8"
              );
        
              const body = {
                concert: concertdetails,
              };
        
              const headers = {
                "Content-Type": "application/json",
              };
        
              const response = await fetch(
                `${BASE_URL}/concert/create-checkout-session`,
                {
                  method: "POST",
                  headers: headers,
                  body: JSON.stringify(body),
                  credentials: "include" 
                }
              );
        
              if (!response.ok) {
                throw new Error("Failed to create checkout session");
              }
        
              // console.log(response) ;
              const session = await response.json();
              console.log("Session object:", session); // Debug: Check session data
        
              if (!session.id) {
                throw new Error("Session ID is missing in the response");
              }
        
              // Redirect to Stripe Checkout
              const result = await stripe.redirectToCheckout({
                sessionId: session.id,
              });
              // console.log(result)
              if (result.error) {
                console.error(result.error.message);
              }
              
              // addingDetails() ;
              // navigate(session.session_url) ;
            } catch (error) {
              console.error("Error:", error);
            }
        
            // toast.success("Payment Success");
          };
    const commonfun = async () => {
        // makePayment() ;
        if (token == null || token == undefined ) {
            toast.error("You need to login") ;
        }else {
    
          const res = await addingDetails();
        }
      };

  return (
    <div>StripePayment</div>
  )
}

export default StripePayment