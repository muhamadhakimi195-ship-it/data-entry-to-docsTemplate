import { Document, model, Schema } from 'mongoose';

interface FormDocument extends Document {
  data: Record<string, any>;
  template: Uint8Array;
}

const FormSchema = new Schema({
  data: { type: Object, required: true },
  template: { type: Schema.Types.Buffer, required: true },
});

const Form = model<FormDocument>('Form', FormSchema);
export default Form;
