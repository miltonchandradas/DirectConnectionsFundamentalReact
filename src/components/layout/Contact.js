import React from "react";
import {
   FormGroup,
   FormInput,
   FormItem,
   FormLabel,
   FormTextarea,
   Checkbox,
} from "fundamental-react/Forms";
import { Button } from "fundamental-react/Button";

import { ComboboxInput } from "fundamental-react/ComboboxInput";

const Contact = () => {
   return (
      <section className="section-contact">
         <h2>Please contact us</h2>
         <FormGroup>
            <FormItem>
               <FormLabel htmlFor="input-1" required>
                  Name
               </FormLabel>
               <FormInput id="input-1" placeholder="Name" />
            </FormItem>
         </FormGroup>
         <FormGroup>
            <FormItem>
               <FormLabel htmlFor="input-2" required>
                  Email
               </FormLabel>
               <FormInput id="input-2" placeholder="Email" />
            </FormItem>
         </FormGroup>
         <FormGroup>
            <FormItem>
               <FormLabel htmlFor="input-3">How did you find us ?</FormLabel>
               <ComboboxInput
                  id="input-3"
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
               <Checkbox id="input-4" checked={true} name="User" />
            </FormItem>
         </FormGroup>
         <FormGroup>
            <FormItem>
               <FormLabel htmlFor="textarea-1" required>
                  Drop us a line
               </FormLabel>
               <FormTextarea
                  defaultValue=" Pellentesque metus lacus commodo eget justo ut rutrum varius nunc."
                  id="textarea-1"
               />
            </FormItem>
         </FormGroup>
         <Button option="emphasized" className="fr-button">
            Submit
         </Button>
      </section>
   );
};

export default Contact;
