import React, { useState } from 'react';
import { Button, Heading, Table, TextField } from '@navikt/ds-react';

import styles from '../BiDiagnoseEndringForm/BiDiagnoseEndringForm.module.css';
import { BiDiagnose } from '../../pages/sykmelding/biDiagnoseEndring/BiDiagnoseEndring';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

interface BiDiagnoseEndringFormProps {
    onChange: (biDiagonser: BiDiagnose[], sykmeldingId: string) => void;
}

const BiDiagnoseEndringForm = ({ onChange }: BiDiagnoseEndringFormProps): JSX.Element => {
    const [kode, setKode] = useState('');
    const [system, setSystem] = useState('');
    const [biDiagonser, setBidiagnoser] = useState<BiDiagnose[]>([]);
    const [sykmeldingId, setSykmeldingId] = useState('');
    const [conformationModalOpen, setConformationModalOpen] = useState(false);

    const handleLeggTilClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        const biDiagnose: BiDiagnose = {
            kode: kode,
            system: system,
        };
        setBidiagnoser((prevBidiagnose) => {
            return [biDiagnose, ...prevBidiagnose];
        });
    };

    const showBiDiagnoserAndEndre = (
        <div>
            <Heading level="1" size="medium">
                Følgende biDiagnoser er lagt klar for å endres
            </Heading>
            <Table size="small" zebraStripes>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">kode</Table.HeaderCell>
                        <Table.HeaderCell scope="col">system</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {biDiagonser.map(({ kode, system }, i) => (
                        <Table.Row key={i + kode}>
                            <Table.HeaderCell scope="row">{kode}</Table.HeaderCell>
                            <Table.DataCell>{system}</Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <TextField
                label="sykmeldingId, eks 5afaef5d-34ac-4dc5-909f-78c1d82dbf69"
                size="medium"
                onChange={(event) => {
                    setSykmeldingId(event.currentTarget.value);
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
                message={`Er du sikker på at du vil endre houved bi diagnose for sykmelding med id: ${sykmeldingId}`}
                onCancel={() => {
                    setConformationModalOpen(false);
                }}
                onOK={() => {
                    onChange(biDiagonser, sykmeldingId);
                    setConformationModalOpen(false);
                }}
                open={conformationModalOpen}
            ></ConfirmationModal>
        </div>
    );

    return (
        <div>
            <TextField
                label="kode, eks Z09"
                size="medium"
                onChange={(event) => {
                    setKode(event.currentTarget.value);
                }}
            />
            <TextField
                label="system eks: ICD10 eller ICPC2"
                size="medium"
                onChange={(event) => {
                    setSystem(event.currentTarget.value);
                }}
            />
            <Button variant="secondary" size="medium" className={styles.button} onClick={handleLeggTilClick}>
                Legg til diagnose
            </Button>
            {biDiagonser.length > 0 && showBiDiagnoserAndEndre}
        </div>
    );
};

export default BiDiagnoseEndringForm;
