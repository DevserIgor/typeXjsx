import React, { useState, useEffect, FormEvent } from 'react';

interface DevFormData {
    github_username: string;
    techs: string;
    latitude: number;
    longitude: number;
}

interface DevFormProps {
    onSubmit: (data: DevFormData) => Promise<void>;
}

function DevForm({ onSubmit }: DevFormProps) {
    //exemplo de como tipar um useState
    const [github_username, setGithub_username] = useState<String>('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => {
                console.log(err);
            },
            {
                timeout: 30000,
            }
        );
    }, []);

    async function handlesubmit(e: FormEvent) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGithub_username('');
        setTechs('');
    }

    return (
        <form onSubmit={handlesubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do Github</label>
                <input
                    name="github_username"
                    id="github_username"
                    required
                    value={github_username}
                    onChange={e => setGithub_username(e.target.value)}
                />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    name="techs"
                    id="techs"
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        required
                        value={latitude}
                        onChange={e => setLatitude(Number(e.target.value))}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        type="number"
                        name="longitude"
                        id="longitude"
                        required
                        value={longitude}
                        onChange={e => setLongitude(Number(e.target.value))}
                    />
                </div>
            </div>

            <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;
