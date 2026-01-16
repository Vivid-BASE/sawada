"use client";

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';
import contactData from '@/data/contact.json';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            // EmailJSを使用してメール送信
            const result = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone || '未入力',
                    message: formData.message,
                    to_email: 'sawada@aforce-e.com'
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            if (result.status === 200) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                throw new Error('EmailJS送信エラー');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('送信に失敗しました。しばらくしてから再度お試しください。');
            console.error('EmailJS Error:', error);
        }
    };

    return (
        <section className={`section ${styles.section}`}>
            <div className="container">
                <h2 className="section-title fade-in-up">Contact</h2>
                <div className={styles.wrapper}>
                    <div className={`${styles.infoBlock} fade-in-up`}>
                        <h3 className={styles.companyName}>{contactData.company}</h3>
                        <p className={styles.address}>{contactData.address}</p>
                        <div className={styles.contactDetails}>
                            <p><strong>TEL:</strong> {contactData.phone}</p>
                            <p><strong>Email:</strong> {contactData.email}</p>
                        </div>

                        <div className={styles.socials}>
                            {contactData.socials.map(social => (
                                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                    {social.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className={`${styles.formBlock} fade-in-up delay-100`}>
                        <h3 className={styles.formTitle}>お問い合わせフォーム</h3>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.label}>
                                    お名前 <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.label}>
                                    メールアドレス <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="phone" className={styles.label}>
                                    お電話番号
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message" className={styles.label}>
                                    メッセージ <span className={styles.required}>*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className={styles.textarea}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className={styles.submitButton}
                            >
                                {status === 'loading' ? '送信中...' : '送信する'}
                            </button>

                            {status === 'success' && (
                                <p className={styles.successMessage}>
                                    お問い合わせを送信しました。ありがとうございます。
                                </p>
                            )}

                            {status === 'error' && (
                                <p className={styles.errorMessage}>
                                    {errorMessage}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
