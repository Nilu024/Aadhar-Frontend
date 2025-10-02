# TODO: Fix TypeScript Build Errors

## Errors to Fix
- [ ] individual_form.tsx: 'onBack' is declared but its value is never read
- [x] LandingPage.tsx: Property 'onBack' does not exist on type 'IntrinsicAttributes' for Login component
- [x] Login.tsx: 'LoginProps' is declared but never used

## Plan
1. Update Login.tsx to accept and use the onBack prop
2. Update individual_form.tsx to use the onBack prop (add back button)
3. Verify that LandingPage.tsx passes onBack correctly to Login

## Steps
- [x] Modify Login component to destructure onBack from props
- [x] Add a back button in Login component that calls onBack if provided
- [ ] Add a back button in IndividualSocialWorkerForm that calls onBack
- [ ] Run build to verify errors are fixed
