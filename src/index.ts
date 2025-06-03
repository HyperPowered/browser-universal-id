interface FingerprintData {
    userAgent: string;
    language: string;
    platform: string;
    screen: {
        width: number;
        height: number;
        colorDepth: number;
    };
    hardware: {
        cores: number;
        memory: number;
    },
    timezone: string;
    plugins: string;
    features: {
        webgl: boolean;
        webrtc: boolean;
    }
}

interface FingerprintResult {
    buid: string;
    data: FingerprintData;
}

async function getBrowserFingerprint(): Promise<FingerprintResult> {
    const fingerprintData: FingerprintData = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screen: {
            width: screen.width,
            height: screen.height,
            colorDepth: screen.colorDepth
        },
        hardware: {
            cores: navigator.hardwareConcurrency,
            // @ts-ignore
            memory: navigator.deviceMemory || 'unknown'
        },
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        plugins: Array.from(navigator.plugins || []).map(p => p.name).join(','),
        features: {
            webgl: typeof WebGLRenderingContext !== 'undefined',
            webrtc: typeof RTCPeerConnection !== 'undefined',
        }
    };

    const str = JSON.stringify(fingerprintData);
    const hash = await sha256(str);

    return {
        buid: hash,
        data: fingerprintData,
    }
}

async function sha256(str: string) {
    const utf8 = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    return [...new Uint8Array(hashBuffer)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export const BrowserUniversalId = {
    getBrowserFingerprint: getBrowserFingerprint,
    sha256: sha256,
}