import { Skat } from '@/components/Form/Skat/skat';
import { CalcAlVitrin } from '@/components/Form/CalcAlVitrin/CalcAlVitrin';
import { ArborNova } from '@/components/Form/Arbor-Nova/arbor-nova';
import { Adelkreis } from '@/components/Form/Adelkreis/adelkreis';
import { Duco } from '@/components/Form/Duco/duco';
import { Tbm } from '@/components/Form/Tbm/tbm';
import { Evosoft } from '@/components/Form/Evosoft/evosoft';
import { FIP } from '@/components/Form/FIP/fip';
import { YourDay } from '@/components/Form/YourDay/yourday';
import { FormDveriKupe } from '@/components/Form/Dveri-kupe/dveriKupe';


const formComponents = {
  Skat: Skat,
  AlVitrin: CalcAlVitrin,
  ArborNova: ArborNova,
  Adelkreis: Adelkreis,
  Duco: Duco,
  Tbm: Tbm,
  Evosoft: Evosoft,
  FIP: FIP,
  YourDay: YourDay,
  DveriKupe: FormDveriKupe,
};

export async function generateStaticParams() {
  return Object.keys(formComponents).map(formType => ({
    FormType: formType
  }));
}

export default function FormPage({ params }) {
  const FormComponent = formComponents[params.FormType];
  
  if (!FormComponent) {
    return <div>Форма не найдена</div>;
  }

  return <FormComponent />;
}