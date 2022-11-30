import React, { useState } from 'react';
import { Button, Textarea, TextField } from '@navikt/ds-react';

import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

import styles from './OppdaterPeriodeForm.module.css';

interface OppdaterPeriodeFormProps {
    onChange: (sykmeldingId: string, periodeListe: string) => void;
}

const OppdaterPeriodeForm = ({ onChange }: OppdaterPeriodeFormProps): JSX.Element => {
    const [sykmeldingId, setSykmeldingId] = useState('');
    const [periodeListe, setPeriodeListe] = useState('');

    const [conformationModalOpen, setConformationModalOpen] = useState(false);

    return (
        <div>
            <TextField
                className={styles.commonFormElement}
                label="SykmeldingId, f. eks. 5afaef5d-34ac-4dc5-909f-78c1d82dbf69"
                size="medium"
                onChange={(event) => {
                    setSykmeldingId(event.currentTarget.value);
                }}
            />
            <Textarea
                className={styles.commonFormElement}
                label="Periodeliste som json, eksempelverdi:"
                size="medium"
                defaultValue={
                    '"perioder": [\n' +
                    '    {\n' +
                    '      "fom": "2020-12-09",\n' +
                    '      "tom": "2020-12-15",\n' +
                    '      "gradert": null,\n' +
                    '      "reisetilskudd": false,\n' +
                    '      "behandlingsdager": null,\n' +
                    '      "aktivitetIkkeMulig": {\n' +
                    '        "medisinskArsak": {\n' +
                    '          "arsak": [\n' +
                    '            "AKTIVITET_FORHINDRER_BEDRING"\n' +
                    '          ],\n' +
                    '          "beskrivelse": "andre årsaker til sykefravær"\n' +
                    '        },\n' +
                    '        "arbeidsrelatertArsak": {\n' +
                    '          "arsak": [\n' +
                    '            "ANNET"\n' +
                    '          ],\n' +
                    '          "beskrivelse": "andre årsaker til sykefravær"\n' +
                    '        }\n' +
                    '      },\n' +
                    '      "avventendeInnspillTilArbeidsgiver": null\n' +
                    '    }\n' +
                    '  ]'
                }
                onChange={(event) => {
                    setPeriodeListe(event.currentTarget.value);
                }}
            />
            <Button
                variant="primary"
                size="medium"
                className={styles.button}
                onClick={() => {
                    setConformationModalOpen(true);
                }}
            >
                Endre
            </Button>
            <ConfirmationModal
                message={`Er du sikker på at du vil endre periode for sykmelding med id: ${sykmeldingId}`}
                onCancel={() => {
                    setConformationModalOpen(false);
                }}
                onOK={() => {
                    onChange(sykmeldingId, periodeListe);
                    setConformationModalOpen(false);
                }}
                open={conformationModalOpen}
            ></ConfirmationModal>
        </div>
    );
};

export default OppdaterPeriodeForm;
