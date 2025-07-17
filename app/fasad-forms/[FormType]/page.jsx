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
import { Suspense } from 'react';

const formComponents = {
  Skat,
  AlVitrin: CalcAlVitrin,
  ArborNova,
  Adelkreis,
  Duco,
  Tbm,
  Evosoft,
  FIP,
  YourDay,
  DveriKupe: FormDveriKupe,
};

export async function generateStaticParams() {
  return Object.keys(formComponents).map(formType => ({
    FormType: formType
  }));
}

export async function generateMetadata({ params }) {
  const { FormType } = await params;
  
  return {
    title: `Form ${FormType}`,
  };
}

function FormContent({ FormType }) {
  const FormComponent = formComponents[FormType];
  
  if (!FormComponent) {
    return <div>Форма не найдена</div>;
  }

  return <FormComponent />;
}

export default async function FormPage({ params }) {
  const { FormType } = await params;

  return (
    <Suspense fallback={<div>Загрузка формы...</div>}>
      <FormContent FormType={FormType} />
    </Suspense>
  );
}