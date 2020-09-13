import React from "react";
import {
   FormGroup,
   FormInput,
   FormItem,
   FormLabel,
   FormTextarea,
   Checkbox,
   Button,
   ComboboxInput,
} from "fundamental-react";

const Contact = () => {
   return (
      <section className="section-contact">
         <h2>Please contact us</h2>
         <FormGroup readOnly={true}>
            <FormItem>
               <FormLabel htmlFor="input-1" required>
                  Name
               </FormLabel>
               <FormInput id="input-1" value="Name" disabled />
            </FormItem>
         </FormGroup>
         <FormGroup>
            <FormItem>
               <FormLabel htmlFor="input-2" required>
                  Email
               </FormLabel>
               <FormInput id="input-2" value="Email" disabled />
            </FormItem>
         </FormGroup>
         <FormGroup>
            <FormItem>
               <FormLabel htmlFor="input-3">How did you find us ?</FormLabel>
               <ComboboxInput
                  id="input-3"
                  selectedKey={1}
                  disabled
                  options={[
                     {
                        key: "1",
                        text: "Friends",
                     },
                     {
                        key: "2",
                        text: "Search engine",
                     },
                     {
                        key: "3",
                        text: "Advertisement",
                     },
                     {
                        key: "4",
                        text: "Online",
                     },
                  ]}
                  placeholder="Select an option"
               />
            </FormItem>
         </FormGroup>
         <FormGroup>
            <FormItem>
               <FormLabel htmlFor="input-4">News Letter ?</FormLabel>
               <Checkbox id="input-4" checked={true} name="User" disabled />
            </FormItem>
         </FormGroup>
         <FormGroup>
            <FormItem>
               <FormLabel htmlFor="textarea-1" required>
                  Drop us a line
               </FormLabel>
               <FormTextarea
                  defaultValue=" Pellentesque metus lacus commodo eget justo ut rutrum varius nunc."
                  id="textarea-1" disabled
               />
            </FormItem>
         </FormGroup>
         <Button option="emphasized" className="fr-button" disabled>
            Submit
         </Button>
      </section>
   );
};

export default Contact;
