import GooglePayButton from '@google-pay/button-react';
import api from '@utils/api';

export function PayButton({amount, projectId}) {
    const handlePaymentSuccess = (paymentResponse) => {
        console.log('Payment successful', paymentResponse);
    
        
        api.post('/transactions/create-payout', {
            receiver_email: projectId,
            amount: amount
          })
          .then(response => JSON.stringify(response))
          .then(data => console.log('Payout created', data))
          .catch(error => console.error('Error:', error));
      };
    return (
        <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA']
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGatewayMerchantId'
                }
              }
            }
          ],
          merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Demo Merchant'
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: amount.toString(),
            currencyCode: 'USD',
            countryCode: 'US'
          }
        }}
        onLoadPaymentData={handlePaymentSuccess}
      />
    );
}