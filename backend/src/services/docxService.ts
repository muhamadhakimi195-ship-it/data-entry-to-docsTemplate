import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import Form from '../models/form';

export async function generateDocument(formId: string): Promise<Buffer> {
  const form = await Form.findById(formId);
  if (!form) throw new Error('Form not found');

  const zip = new JSZip();
  await zip.loadAsync(form.template);
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
  doc.setData(form.data);
  doc.render();

  const buffer = await zip.generateAsync({ type: 'nodebuffer' });
  return buffer;
}
