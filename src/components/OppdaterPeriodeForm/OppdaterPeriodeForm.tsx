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
                defaultValue={JSON.stringify(
                    {
                        periodeliste: [
                            {
                                fom: '2020-12-09',
                                tom: '2020-12-15',
                                gradert: null,
                                reisetilskudd: false,
                                behandlingsdager: null,
                                aktivitetIkkeMulig: {
                                    medisinskArsak: {
                                        arsak: ['AKTIVITET_FORHINDRER_BEDRING'],
                                        beskrivelse: 'andre årsaker til sykefravær',
                                    },
                                    arbeidsrelatertArsak: {
                                        arsak: ['ANNET'],
                                        beskrivelse: 'andre årsaker til sykefravær',
                                    },
                                },
                                avventendeInnspillTilArbeidsgiver: null,
                            },
                        ],
                    },
                    null,
                    2,
                )}
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
